const express = require("express");
const { testUserController } = require("../controllers/testControllers");

//route object
const router = express.Router();

// routes GET | POST | UPDATE | DELETE
router.get('/test-user', testUserController);

//exports
module.exports = router;