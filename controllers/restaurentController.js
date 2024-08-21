const RestaurentModel = require("../model/RestaurentModel");

//Create Restaurent Contoller
const createRestaurentController = async (req, res) => {
    try {
        const { title, imageUrl, foods, time, pickups, delivery, isOpen, logoUrl, rating, ratingCount, code, coords } = req.body;

        if (!title || !coords) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Restaurent Title and Address",
                error
            });
        }
        const newRestaurent = new RestaurentModel({
            title,
            imageUrl,
            foods,
            time,
            pickups,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords
        });
        await newRestaurent.save();
        res.status(200).send({
            success: true,
            message: "Restaurent Created Successfully",
            newRestaurent
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Create Restaurent API",
            error
        });
    }
}

// Get All Restaurent Controller
const getAllRestaurentController = async (req, res) => {

    try {
        const restaurents = await RestaurentModel.find({});
        if (!restaurents) {
            return res.status(404).send({
                success: false,
                message: "No Restaurents",
            });
        }
        res.status(200).send({
            success: true,
            totalRestaurentsCount: restaurents.length,
            restaurents
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get All Restaurent API",
            error
        });
    }
};

// Get Single Restaurent by ID
const getSingleRestaurentController = async (req, res) => {

    try {
        const restaurentId = req.params.id;
        if (!restaurentId) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Restaurent ID",
            });
        }
        const restaurent = await RestaurentModel.findById({ _id: restaurentId });
        if (!restaurent) {
            return res.status(404).send({
                success: false,
                message: "Restaurent is Not Found OR Restaurent Id is Incorrect ",
            });
        }
        res.status(201).send({
            success: true,
            restaurent
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get Single Restaurent API",
            error
        });
    }
};

//Delete Restaurent By ID Controller
const deleteRestaurentController = async (req, res) => {
    try {
        const restaurentId = req.params.id;
        if (!restaurentId) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Restaurent ID",
            });
        }
        const restaurent = await RestaurentModel.findByIdAndDelete({ _id: restaurentId });
        if (!restaurent) {
            return res.status(404).send({
                success: false,
                message: "Restaurent is Not Found OR Restaurent Id is Incorrect ",
            });
        }
        res.status(200).send({
            success: true,
            message: "Restaurent  is Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Delete Restaurent API",
            error
        });
    }
}

module.exports = { createRestaurentController, getAllRestaurentController, getSingleRestaurentController, deleteRestaurentController };