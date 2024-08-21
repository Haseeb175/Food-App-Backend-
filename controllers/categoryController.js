const categoryModel = require("../model/categoryModel");

//Create Category Controller
const createCategoryController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        if (!title) {
            return res.status(404).send({
                success: false,
                message: "Please provide Title of Category"
            });
        }
        const newCategory = new categoryModel({ title, imageUrl });
        await newCategory.save();
        res.status(200).send({
            success: true,
            message: "Category Created Successfully",
            newCategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Create Category API",
            error
        });
    }
};

// Get All Category Controller
const getAllCategoryController = async (req, res) => {
    try {

        const categories = await categoryModel.find({})
        if (!categories) {
            return res.status(404).send({
                success: false,
                message: "No category Found",

            });
        }
        res.status(201).send({
            success: true,
            totalCategoriesCount: categories.length,
            categories

        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get All Category API",
            error
        });
    }
};

// Get Category By ID Controller
const getSingleCategoryController = async (req, res) => {
    try {
        const categoryId = req.params.id;
        if (!categoryId) {
            return res.status(404).send({
                success: false,
                message: "Please Provide category ID",

            });
        }
        const category = await categoryModel.findById({ _id: categoryId })
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Catergory Not Found OR Category is Incorrect"
            });
        }
        res.status(201).send({
            success: true,
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get Single Category API",
            error
        });
    }
};

//Update Category Controller
const updateCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, imageUrl } = req.body;
        const updateCategory = await categoryModel.findByIdAndUpdate(id, { title, imageUrl }, { new: true })
        if (!updateCategory) {
            return res.status(404).send({
                success: false,
                message: "Catergory Not Found OR Category is Incorrect"
            });
        }
        res.status(201).send({
            success: true,
            message: "Updated Catergory Successfully",
            updateCategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Update Category API",
            error
        });
    }
}
// Delete Category Controller
const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Category ID",
            });
        }
        const category = await categoryModel.findById(id)
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Catergory Not Found OR Category is Incorrect"
            });
        }
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Catergory Deleted Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Delete Category API",
            error
        });
    }
}

module.exports = { createCategoryController, getAllCategoryController, getSingleCategoryController, updateCategoryController, deleteCategoryController }