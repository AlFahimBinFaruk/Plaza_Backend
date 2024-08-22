const { verifyToken } = require("../config/jwt");

const Auth = (req, res, next) => {
    // Extract the token from the Authorization header
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    
    // Split the header to get the token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ msg: 'Token is not valid or has expired' });
        }

        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Token is not valid or has expired' });
    }
};

module.exports = { Auth };
