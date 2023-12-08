const express = require("express");
const router = express.Router();
const { authMe } = require("../controllers/auth_logic.js");
const { requireAuthedUser } = require("../utils/security.js");

router.get("/me", requireAuthedUser, authMe);

module.exports = router;
