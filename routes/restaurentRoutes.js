const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { createRestaurentController, getAllRestaurentController, getSingleRestaurentController, deleteRestaurentController } = require("../controllers/restaurentController");
const router = express.Router();

//route

//Create Restaurent || POST
router.post("/createRestaurent", authMiddleware, createRestaurentController);

//Get All Restaurent || GET
router.get("/getAll", getAllRestaurentController);

//Get Restaurent by ID || GET
router.get("/get/:id", getSingleRestaurentController);

// Delete Restaurent by ID || Delete
router.delete("/delete/:id", deleteRestaurentController);

module.exports = router;