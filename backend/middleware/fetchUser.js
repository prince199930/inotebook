const jwt = require('jsonwebtoken');
const JWT_SECRET = "HarryIsAGoodB$oy";

const fetchUser = (req, res, next) => {
    //Get the user from the jwt toke and add id to the req object
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next()}
    catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

module.exports = fetchUser;