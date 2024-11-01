const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'Token format is incorrect' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecretkey'); 
        
        req.user = decoded.userId;

        next();
    } catch (err) {
        console.error('JWT verification error:', err.message);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

