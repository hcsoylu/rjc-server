const express = require("express");

const router = express.Router();

const { login, register, edit } = require("../controllers/auth.controller");
const auth = require("../middleware/authentication");

router.post("/register", register);
router.post("/login", login);
router.patch("/edit/:id", auth, edit);

module.exports = router;
