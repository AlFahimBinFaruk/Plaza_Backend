const { verifyToken } = require("../config/jwt");


const Auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ msg: 'Token is not valid or has expired' });
    }

    req.user = decoded.user;
    next();
};


module.exports = { Auth };