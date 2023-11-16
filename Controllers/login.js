const { validateEmail } = require("../Services/Registration/RegistrationValidation.js");
const ClientService = require("../Services/ClientService.js");

const login = async function(request, response){
    let passwordVerified = false;
    console.log(request.body.Email);
    if(!request.is('json')){
        response.status(415).send({error: "Unsupported Media Type: Request object should be in json format.", "Access-Control-Allow-Origin": '*'})
        return;
    }
    if(!validateEmail(request.body.Email)){
        response.status(422).send({error: "Email format is not valid.", "Access-Control-Allow-Origin": '*'})
        return;
    }

    try{
        passwordVerified = await ClientService.checkPassword(request.body);
    }catch(error){
        response.status(404).send({error: error.message, "Access-Control-Allow-Origin": '*'})
        return;
    }

    if(passwordVerified)
        response.status(200).send({message: "User logged in",  "Access-Control-Allow-Origin": '*'});
    else
        response.status(401).send({error: "Incorrect Username or Password",  "Access-Control-Allow-Origin": '*'});
}

module.exports = { 
    login
}