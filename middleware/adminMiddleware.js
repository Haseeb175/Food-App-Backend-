const userModel = require("../model/userModel");

module.exports = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.body.id);
        if (user.usertype !== "admin") {
            return res.status(401).send({
                sucess: false,
                message: "Only Admin Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            message: "Error in Admin Middleware",
            error
        });
    }
}