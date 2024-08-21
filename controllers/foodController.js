const foodModel = require("../model/foodModel");

// Create Food Controller
const createFoodController = async (req, res) => {
    try {
        const { title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurent, rating } = req.body;
        if (!title || !description || !price || !restaurent) {
            return res.status(404).send({
                success: false,
                message: "Please Provide All Food Fields",

            });
        };
        const newfood = new foodModel({ title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurent, rating });
        await newfood.save();
        res.status(201).send({
            success: true,
            message: "Food Created Successfully",
            newfood
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Create Food API",
            error
        });
    }
};

// Get All Food Controller
const getAllFoodContoroller = async (req, res) => {
    try {
        const getAllFood = await foodModel.find({})
        if (!getAllFood) {
            return res.status(404).send({
                success: false,
                message: "No Food Found",
            });
        }
        res.status(201).send({
            success: true,
            TotalFoodCount: getAllFood.length,
            getAllFood
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get All Food API",
            error
        });
    }
};

// Get Single Food By ID Controller
const getSingleFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Food ID",
            });
        }
        const food = await foodModel.findById({ _id: foodId })
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No Food Found OR Food ID is in Incorrect",
            });
        }
        res.status(201).send({
            success: true,
            food
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get Single Food API",
            error
        });
    }
};

// Get Food by Restaurent Controller
const getFoodByRestaurent = async (req, res) => {
    try {
        const restaurentId = req.params.id;
        if (!restaurentId) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Food ID",
            });
        }
        const foods = await foodModel.find({ restaurent: restaurentId })
        if (!foods) {
            return res.status(404).send({
                success: false,
                message: "No Food Found OR Restaurent ID is in Incorrect",
            });
        }
        res.status(201).send({
            success: true,
            message: "Restaurent Base Food",
            foods
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get Single Food API",
            error
        });
    }
};

//Update Food Controller 
const updateFoodController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurent, rating } = req.body;
        if (!title || !description || !price || !restaurent) {
            return res.status(404).send({
                success: false,
                message: "Please Provide All Food Fields",

            });
        };
        const updateFood = await foodModel.findByIdAndUpdate(id, { title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurent, rating }, { new: true })
        if (!updateFood) {
            return res.status(404).send({
                success: false,
                message: "Food is not Found or Food ID is Incorrect",
            });
        }
        res.status(201).send({
            success: true,
            message: "Update Food Successfully",
            updateFood
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Update Food API",
            error
        });
    }
};

// Delete Food Controller
const deleteFoodController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Food ID",
            });
        }
        const deletefood = await foodModel.findByIdAndDelete(id);
        if (!deletefood) {
            return res.status(404).send({
                success: false,
                message: "Food is not Found",
            });
        }
        res.status(201).send({
            success: true,
            message: "Food is Deleted Successfully",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Delete Food API",
            error
        });
    }
};


module.exports = { createFoodController, getAllFoodContoroller, getSingleFoodController, getFoodByRestaurent, updateFoodController, deleteFoodController };