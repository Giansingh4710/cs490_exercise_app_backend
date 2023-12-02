// import express / cors / morgan
const express = require("express"); // Express.js for building the web server
const cors = require("cors"); // Cross-Origin Resource Sharing middleware (for handling CORS)
const morgan = require("morgan"); // Logging middleware (for logging HTTP requests)

// import Error Handling file, and security middleware
const { NotFoundError } = require("./utils/errors"); // Custom error handling
const security = require("./middleware/security"); // security middleware (JWT)

// import routes
const register = require("./Routes/Register.js");
const login = require("./Routes/login.js");
const auth = require("./Routes/auth.js");
const logActivity = require("./Routes/LogActivity.js");
const coaches = require("./Routes/coaches.js");
const requests = require("./Routes/request.js");

// create express app
const app = express();

const bodyParser = require("body-parser");
const corsOptions = { origin: "*" }; // url from frontend/react
app.use(cors(corsOptions));

app.use(express.json()); // needed to get body from POST request
app.use(bodyParser.json());

app.use(express.json());
app.use(morgan("tiny"));

// security middleware to authenticate user and create JWTs
app.use(security.extractUserFromJwt);

// health check
app.get("/", (req, res) => {
  res.send("Hello, this is the backend of your CS490 exercise app!");
});

app.use("/register", register);
app.use("/login", login);
app.use("/auth", auth);
app.use("/logActivity", logActivity);
app.use("/coaches", coaches);
app.use("/Request", requests);

// error handling - not found
app.use((req, res, next) => {
  return next(new NotFoundError());
});

// error-handling middleware:
// - captures errors that occur during request processing
// - formats error responses with status codes and messages
// - sends JSON error responses to clients
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;
  return res.status(status).json({
    error: { message, status },
  });
});
module.exports = app;
