const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getUserController, updateUserController, updateUserPasswordController, resetPasswordController, deleteUserController } = require("../controllers/userController");

const router = express.Router();

// Get User Data || GET
router.get("/getUser", authMiddleware, getUserController);

// Update User Data || PUT
router.put("/updateUser", authMiddleware, updateUserController);

// Update User Password || POST
router.post("/updatePassword", authMiddleware, updateUserPasswordController);

// Reset User Password || POST
router.post("/resetPassword", authMiddleware, resetPasswordController);

//Delete User Account || DELETE
router.delete("/deleteUser/:id", authMiddleware, deleteUserController)

module.exports = router;