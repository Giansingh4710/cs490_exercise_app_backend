function validateName(name) {
  const nameRegex = new RegExp("^[A-Za-z .-]{2,32}$");
  return nameRegex.test(name);
}

function validateEmail(email) {
  const emailRegex = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
  );
  return emailRegex.test(email);
}

module.exports = { validateName, validateEmail };
