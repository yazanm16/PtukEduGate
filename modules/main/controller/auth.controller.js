
const { login } = require("../service/auth.service");

const loginByPost = async (req, res) => {
    const { emailOrUsername, password } = req.body;

    try {
        const result = await login(emailOrUsername, password);
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = loginByPost;
