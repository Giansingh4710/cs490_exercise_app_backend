const { validateEmail } = require("../utils/helper_funcs.js");

const ClientService = require("../Services/ClientService.js");
const { createUserJwt } = require("../utils/tokens.js");

const login = async function (request, response) {
  let passwordVerified = false;
  if (!request.is("json")) {
    response.status(415).send({
      error: "Unsupported Media Type: Request object should be in json format.",
      "Access-Control-Allow-Origin": "*",
    });
    return;
  }
  if (!validateEmail(request.body.Email)) {
    response.status(422).send({
      error: "Email format is not valid.",
      "Access-Control-Allow-Origin": "*",
    });
    return;
  }

  try {
    const client = await ClientService.checkPassword(request.body);
    if (client) {
      const token = createUserJwt(client); // create JWT for the user
      // if a client exists, send the user object, and the token back
      response.status(200).json({
        message: "User logged in",
        user: { id: client.UserID, email: client.Email },
        token: token,
      });
    } else {
      response.status(401).send({
        error: "Incorrect Username or Password",
        "Access-Control-Allow-Origin": "*",
      });
    }
  } catch (error) {
    response
      .status(404)
      .send({ error: error.message, "Access-Control-Allow-Origin": "*" });
    return;
  }
};

module.exports = {
  login,
};
