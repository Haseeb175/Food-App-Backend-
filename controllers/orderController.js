const orderModel = require("../model/orderModel");

//Place Order Controller
const placeOrderFoodController = async (req, res) => {
    try {
        const { cart } = req.body;
        if (!cart) {
            return res.status(404).send({
                success: false,
                message: "Please Add Food cart OR payment method"
            });
        }
        let total = 0;
        cart.map((i) => {
            total += i.price
        });
        const newOrder = new orderModel({ foods: cart, payment: total, buyers: req.body.id })
        await newOrder.save();
        res.status(201).send({
            success: true,
            message: "Order Placed Successfully",
            newOrder
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Place Order API",
            error
        });
    }
};

// Change Order Status Controller
const changeOrderStatusController = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Order ID",
            });
        }
        const { status } = req.body;
        if (!status) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Status Field"
            });
        }

        const changeStatus = await orderModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!changeStatus) {
            return res.status(404).send({
                success: false,
                message: "ID does not Found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Order Status has been Changed",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Change Order Status API",
            error
        });
    }
}

module.exports = { placeOrderFoodController, changeOrderStatusController };