const express = require('express')
const User = require("../models/User")
const router = express.Router()
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')

//webtoken secret code
const JWT_pass = "acd$3";

//router 1 : Create a user using post request "/api/authen/createuser"  no login
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),  // validation : express-validator
    body('name', 'Name must be at least 3 characters').isLength({min: 3}),
    body('password', 'Password must be at least 3 characters').isLength({min: 5})
], async (req, res) => {
    //If there are errors, return Bad request and the errors.
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success,errors: errors.array()});
    }
    try {

        // checks if the email already exits or not
        let user = await User.findOne({email: req.body.email})
        if (user) {
            return res.status(400).json({success,error: "Sorry a user with this email already exists."})
        }

        // secures the password using salt and hash method
        const salt = await bcrypt.genSalt(10);
        let securePass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({   // User Schema
            name: req.body.name,  // request
            password: securePass,
            email: req.body.email
        })

        // sending webtoken of createUser data
        const data = {
            user: {
                id: user.id
            }
        }
        const webToken = jwt.sign(data, JWT_pass);
        success = true
        res.json({success,webToken: webToken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Some error occurred.')
    }
})
// router 2 : Authenticate a user using post request "/api/authen/login"  no login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    //If there are errors, return Bad request and the errors.
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success,errors: errors.array()});
    }

    //Destructuring of email and password.
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({success,error: "Please login with correct email/password."})
        }

        const passCheck = await bcrypt.compare(password, user.password)
        if (!passCheck) {
            return res.status(400).json({success,error: "Please login with correct email/password."})
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const webToken = jwt.sign(data, JWT_pass);
        success = true;
        res.json({success,webToken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Some error occurred.')
    }
})

// router 3 : Get logged in user detail using post request "/api/authen/getuser" login

router.post('/getuser', fetchUser, async (req, res) => {
    try {
        // userId is id of the login data.
        let userId = req.user.id
        // user is the login data without the password
        const user = await User.findById(userId).select("-password")
        res.send(user)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Some error occurred.')
    }
})

module.exports = router;

// create user -> webToken -> login ->webToken -> getUser details -> webToken