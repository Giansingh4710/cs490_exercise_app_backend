const express = require("express"); // Express.js for building the web server
const cors = require("cors"); // Cross-Origin Resource Sharing middleware (for handling CORS)
const morgan = require("morgan"); // Logging middleware (for logging HTTP requests)
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

// swagger documention setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./Routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const { NotFoundError } = require("./utils/errors"); // Custom error handling

const register = require("./routes/register.js");
const login = require("./routes/login.js");
const auth = require("./routes/auth.js");
const logActivity = require("./routes/logActivity.js");
const coaches = require("./routes/coaches.js");
const requests = require("./routes/request.js");

const app = express();

const bodyParser = require("body-parser");
const corsOptions = { origin: "*" }; // url from frontend/react
app.use(cors(corsOptions));

app.use(express.json()); // needed to get body from POST request
app.use(bodyParser.json());

app.use(express.json());
app.use(morgan("tiny"));


app.get("/", (req, res) => {
  const full_url = req.get('host');
  const protocol = req.protocol;
  const link = `${protocol}://${full_url}`;

  const routeList = [];
  function print(path, layer) {
    if (layer.route) {
      layer.route.stack.forEach(
        print.bind(null, path.concat(split(layer.route.path))),
      );
    } else if (layer.name === "router" && layer.handle.stack) {
      layer.handle.stack.forEach(
        print.bind(null, path.concat(split(layer.regexp))),
      );
    } else if (layer.method) {
      routeList.push({
        method: layer.method.toUpperCase(),
        route: path.concat(split(layer.regexp)).filter(Boolean).join("/"),
      });
    }
  }
  function split(thing) {
    if (typeof thing === "string") {
      return thing.split("/");
    } else if (thing.fast_slash) {
      return "";
    } else {
      var match = thing.toString()
        .replace("\\/?", "")
        .replace("(?=\\/|$)", "$")
        .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
      return match
        ? match[1].replace(/\\(.)/g, "$1").split("/")
        : "<complex:" + thing.toString() + ">";
    }
  }
  app._router.stack.forEach(print.bind(null, []));

  // const link = "https://cs490-exerciseproj-backend.azurewebsites.net";

  const all_routes_to_show = [];
  const seen = new Set();
  routeList.forEach((item) => {
    const { method, route } = item;
    const mnl = `${method} ${route}`;
    if (seen.has(mnl)){
      return;
    }
    seen.add(mnl);
    const l = `${link}/${route}`;
    console.log(`${method} ${l}`);
    all_routes_to_show.push(`${method} <a href='${l}'>${l}</a>`)
  });
  const sendItem = "<h1>Backend Of CS490 exercise app.<br/> All Routes:</h1>";
  res.send(sendItem.concat(all_routes_to_show.join("<br/>")));
});

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/register", register);
app.use("/login", login);
app.use("/auth", auth);
app.use("/logActivity", logActivity);
app.use("/coaches", coaches);
app.use("/request", requests);

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
