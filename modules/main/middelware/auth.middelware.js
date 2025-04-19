const jwt = require('jsonwebtoken');

const Authenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
    } else {
        return res.status(401).json({ success: false, message: "Token does not exist" });
    }
};

module.exports = Authenticated;
