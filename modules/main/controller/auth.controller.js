
const { login, forgotPassword, resetPassword} = require("../service/auth.service");

const loginByPost = async (req, res) => {
    const { emailOrUsername, password,rememberMe  } = req.body;

    try {
        const result = await login(emailOrUsername, password,rememberMe );
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

const forgotPasswordByPost = async (req, res) => {
    try{
        const{email}=req.body;
        const result = await forgotPassword(email);
        return res.status(200).json({
            success: true,
            message: result
        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            success: false,
            message: err.message
        })

    }

}

const resetPasswordByPost = async (req, res) => {
    try {
        const{token,new_password,confirmPassword }=req.body;
        if (new_password!==confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Passwords don't match",
            })
        }
        const result=await resetPassword(token,new_password,confirmPassword );
        res.status(200).json({
            success: true,
            message: result
        })

    }catch(err){
        console.log(err)
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {
    loginByPost,forgotPasswordByPost,resetPasswordByPost
};
