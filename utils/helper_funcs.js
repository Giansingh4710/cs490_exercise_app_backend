function validateName(name) {
  const nameRegex = new RegExp("^[A-Za-z .-]{2,32}$");
  return nameRegex.test(name);
}

function validateEmail(email) {
  const emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  if (!email || email.length > 254) {
    return false;
  }

  const valid = emailRegex.test(email);
  if (!valid) {
    return false;
  }

  const parts = email.split("@");
  if (parts[0].length > 64) {
    return false;
  }

  const domainParts = parts[1].split(".");
  if (domainParts.some((part) => part.length > 63)) {
    return false;
  }

  return true;
}

function hasAllKeys(object, keys) {
  for (const key of keys) {
    if (!(key in object)) {
      return false;
    }
  }
  return true;
}

module.exports = { validateName, validateEmail, hasAllKeys };
