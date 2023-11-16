const { validateName, validateEmail } = require("../Services/Registration/RegistrationValidation.js");
const ClientService = require("../Services/ClientService.js");

const storeSurvey = async function(request, response){
    if(!request.is('json')){
        response.status(415).send({error: "Unsupported Media Type: Request object should be in json format.", "Access-Control-Allow-Origin": '*'})
        return;
    }

    // validate registration data
    let firstNameValid = validateName(request.body.first_name);
    let lastNameValid = validateName(request.body.last_name);

    // validate age > 18

    // update client data
    try{
        await ClientService.updateClientProfile(request.body);
    }catch(error){
        response.status(404).send({error: error.message, "Access-Control-Allow-Origin": '*'});
        return;
    }

    response.status(200).send({message: "Updated: User survey information updated successfuly", "Access-Control-Allow-Origin": '*'});
};

const  registerAccount = async function(request, response){
    // check if request is json
    if(!request.is('json')){
        response.status(415).send({error: "Unsupported Media Type: Request object should be in json format.", "Access-Control-Allow-Origin": '*'})
        return;
    }

    // validate email and password
    // password would be hashed cannot validate
    if(!validateEmail(request.body.Email)){
        response.status(422).send({error: "Email format is not valid.", "Access-Control-Allow-Origin": '*'})
        return;
    }

    // verify email is not in use
    try {
        await ClientService.registerClient(request.body);
    } catch (error) {
        response.status(400).send({error_message: error.message, "Access-Control-Allow-Origin": '*'});
        return;
    }

    response.status(201).send({message: "Created: User account created.", "Access-Control-Allow-Origin": '*'});
}

module.exports = {
    storeSurvey,
    registerAccount
}