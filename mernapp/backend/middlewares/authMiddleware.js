// const jwt = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const jwtSecret = "Mynameisabcdefghijklmnopqrstuvwxyz";
const authMiddleware = (req, res, next) => {
    // Get the token from the request header
    const token = req.header('Authorization');
    // Check if token exists
    if (!token) {
        return res.status(401).json({ access: 'false', message: 'Authorization denied' });
    }
    try {
        // Verify the token
        const decoded = jwt.verify(token, jwtSecret);

        // Attach user information to the request object
        req.user = decoded.user;

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // Handle token verification errors
        return res.status(401).json({ access: 'true', message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
