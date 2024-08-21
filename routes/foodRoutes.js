const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { createFoodController, getAllFoodContoroller, getSingleFoodController, updateFoodController, getFoodByRestaurent, deleteFoodController, placeOrderFoodController } = require("../controllers/foodController");

const router = express.Router();

//route
// Create Food || POST
router.post('/createFood', authMiddleware, createFoodController);

// Get All Food || GET
router.get('/getAll', getAllFoodContoroller);

// Get Food By ID || GET
router.get('/get/:id', getSingleFoodController);

// Get Food By Restaurent ID || GET
router.get('/getByRestaurent/:id', getFoodByRestaurent);

// Update Food By ID || PUT
router.put('/updateFood/:id', authMiddleware, updateFoodController);

// Delete Food By ID || DELETE
router.delete('/deleteFood/:id', authMiddleware, deleteFoodController);

module.exports = router;