const express = require("express");
const { createCategoryController, getAllCategoryController, getSingleCategoryController, updateCategoryController, deleteCategoryController } = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//route

// Create Category || POST 
router.post("/createCategory", authMiddleware, createCategoryController);

// Get All Category || GET
router.get("/getAll", getAllCategoryController);

// Get Category By ID || GET
router.get("/get/:id", getSingleCategoryController);

// Update Category || PUT
router.put("/updateCategory/:id", authMiddleware, updateCategoryController);

// Delete Category || DELETE
router.delete("/deleteCategory/:id", authMiddleware, deleteCategoryController);

module.exports = router;