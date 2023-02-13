const express = require('express');
const User = require('../models/user');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

var JWT_SECRET = "HarryIsAGoodB$oy"

//ROUTE 1 : Create a User using: POST "/api/auth/createuser". No login required.
router.post('/createuser', [
    body('name', 'Enter a Valid name').isLength({ min: 3 }),
    body('email', "enter a valid email address").isEmail(),
    body('password', "Password must be atLeast 5 Character").isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    //If there are errors, return the errors and Bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    //check whether user already exists with same email
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, errors: [{ msg: 'User already exists' }] });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //Create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        const data = {
            user: {
                id: user.id,
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});


//ROUTE 2 : Login a user using: POST "/api/auth/login". No login required.
router.post('/login', [
    body('email', "enter a valid email address").isEmail(),
    body('password', "Password Password can not be blank").exists()
], async (req, res) => {
    console.log(req.body,"jdhsjkn")
    let success = false;
    //If there are errors, return the errors and Bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring of email and password
    const { email, password } = req.body;
    try {
        //Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({success, errors: [{ msg: 'Invalid Credentials' }] });
        }
        //Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            success = false;
            return res.status(400).json({success, errors: [{ msg: 'Invalid Credentials' }] });
        }
        //Return JWT
        const data = {
            user: {
                id: user.id,
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken });
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }

});

//ROUTE 3 : Get Logged in user details using: POST "/api/auth/getuser". Login required.
router.post('/getuser', fetchuser, async (req, res) => {
    console.log(req.user.id,'userkidid')
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});


module.exports = router;