const express = require("express");
const { registerController, loginController } = require("../controllers/authController");

const router = express.Router();

// routes GET | POST | UPDATE | DELETE

// Register || POST
router.post("/register", registerController);

// Login || POST
router.post("/login", loginController)

module.exports = router;