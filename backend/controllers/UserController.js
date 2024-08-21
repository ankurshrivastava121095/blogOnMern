const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
var jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");

class UserController {

    static register = async(req,res) => {
        try {
            // console.log(req.body);
            const { name, email, password } = req.body

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt)

            const isUserExist = await UserModel.findOne({email: email})

            if (isUserExist) {
                res.status(401).json({ 'status': 'failed', 'message': 'Email Already Registered' })
            } else {
                const data = new UserModel({
                    name: name,
                    email: email,
                    password: hashPassword,
                })
    
                const dataSaved = await data.save()
    
                if (dataSaved) {
                    res.status(201).json({ 'status': 'success', 'message': 'Registration Successful' })
                } else {
                    res.status(401).json({ 'status': 'failed', 'message': 'Error, Try Again' })
                }
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': `Error: ${err}` })
        }
    }

    static login = async(req,res) => {
        try {
            // console.log(req.body);
            const { email, password } = req.body

            if (email && password) {
                const user = await UserModel.findOne({ email: email })

                if (user != null) {
                    const isPasswordMatched = await bcrypt.compare(password, user.password)

                    if ((user.email === email) && isPasswordMatched) {
                        const token = jwt.sign(
                            {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                            },
                            "%$#@!",
                            { expiresIn: "30 days" }
                        );
                        res.status(201).json({ 'status': 'success', 'message': 'Login Successfully', token })
                    } else {
                        res.status(401).json({ 'status': 'failed', 'message': 'Invalid Email or Password' })
                    }
                } else {
                    res.status(401).json({ 'status': 'failed', 'message': 'User not Found' })
                }
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'All Fields are required' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': `Error: ${err}` })
        }
    }

}
module.exports = UserController