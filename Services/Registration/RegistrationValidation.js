// function to validate all registration info
const validateName = function(name){
    const nameRegex = new RegExp("^[A-Za-z .-]{2,32}$");
    return nameRegex.test(name);
}


// function to check if email is already in use
const validateEmail = function(email){
    const emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
    return emailRegex.test(email);
}

module.exports = {
    validateName,
    validateEmail
}