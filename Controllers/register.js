const ClientService = require("../Services/ClientService.js");
const { validateName, validateEmail } = require("../utils/helper_funcs.js");

async function storeSurvey(request, response) {
  if (!request.is("json")) {
    response.status(415).send({
      error: "Unsupported Media Type: Request object should be in json format.",
      "Access-Control-Allow-Origin": "*",
    });
    return;
  }

  // validate registration data
  let firstNameValid = validateName(request.body.first_name);
  let lastNameValid = validateName(request.body.last_name);

  // validate age > 18

  // update client data
  try {
    await ClientService.updateClientProfile(request.body);
  } catch (error) {
    response
      .status(404)
      .send({ error: error.message, "Access-Control-Allow-Origin": "*" });
    return;
  }

  response.status(200).send({
    message: "Updated: User survey information updated successfully",
    "Access-Control-Allow-Origin": "*",
  });
}

async function registerAccount(request, response) {
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

  // verify email is not in use
  try {
    console.log(request.body)
    const { user, token } = await ClientService.registerClient(request.body);
    //return a user object, and the token if successful and the user exists
    if (user) {
      response.status(201).send({
        // message: "Created: User account created.",
        user: {
          email: user.Email,
          id: user.UserID,
        },
        token: token,
        "Access-Control-Allow-Origin": "*",
      });
    } else {
      // User was not created, send an error response
      response.status(500).send({
        error: "Internal Server Error: Unable to create user.",
        "Access-Control-Allow-Origin": "*",
      });
    }
  } catch (error) {
    response.status(400).send({
      error: error.message,
      "Access-Control-Allow-Origin": "*",
    });
    return;
  }
}

module.exports = { storeSurvey, registerAccount };
