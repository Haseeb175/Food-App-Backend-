const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { placeOrderFoodController, changeOrderStatusController } = require("../controllers/orderController");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

//route

// Place Order  || POST
router.post('/placeOrder', authMiddleware, placeOrderFoodController);

// Change Order Status || POST
router.post('/changeStatus/:id', authMiddleware, adminMiddleware, changeOrderStatusController)



module.exports = router;