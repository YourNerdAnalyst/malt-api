const bcrypt = require("bcrypt");
const { User } = require("../models/users");
const { Datas } = require('../models/datas')
const jwt = require("jsonwebtoken");
const cloudinary = require('cloudinary').v2;
const { response } = require("express")


require('dotenv').config();



const signUp = async (req, res) => {
    // get user validate input
    const { first_name, last_name, email, password, location, phone_number, instagram_handle, confirmPassword } = req.body;
    try {
        if (!(first_name, location, password, last_name, email)) {
            return res.status(400).send("Kindly fill all required input")
        }


        //check if user already exist
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            // console.log(existingUser)
            return res.status(409).send("User with this email already exist")
        } else {


            if (password != confirmPassword) {
                return res.status(400).send("password doestn't match")
            }

            //Encrypt user password
            const encryptedPassword = await bcrypt.hash(password, 10)

            //add user to DB
            const user = await User.create({
                first_name,
                last_name,
                instagram_handle,
                location,
                phone_number,
                email: email.toLowerCase(),
                password: encryptedPassword
            })

            //create a   token
            const token = jwt.sign({
                user_id: user._id,
                email
            },
                process.env.TOKEN_KEY
            )

            user.token = token

            // await sendOTPVerificationMail(user, res)
            res.status(201).json({
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                instagram_handle: user.instagram_handle,
                location: user.location,
                phone_number: user.phone_number,


                token,
                message: "User created successfully",
                status_code: 201
            })

        }

    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message,
            status_code: 400
        })
    }

}


const login = async (req, res) => {
    const { email, password } = req.body

    try {
        // validate
        if (!(email && password)) {
            return res.status(400).send("Kindly fill all input")
        }

        //get user
        const user = await User.findOne({ email })
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                const token = jwt.sign(
                    { user_id: user._id, email },
                    process.env.TOKEN_KEY
                )
                user.token = token
                res.status(200).json({
                    id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    instagram_handle: user.instagram_handle,
                    location: user.location,
                    phone_number: user.phone_number,
                    token,
                    message: "Login Successfull",
                    status_code: 200
                })
            } else {
                res.status(400).send("password Incorrect")
            }
        } else {
            res.status(404).send("No account with this email")
        }

    } catch (error) {
        res.json({
            status: "FAILED",
            status_code: 400,
            message: error.message
        })
    }

}

const crm = async (req, res) => {
    // get user validate input
    const { first_name, last_name, email, password, location, phone_number, nominate, confirmPassword } = req.body;
    try {
        if (!(first_name, location, password, last_name, email)) {
            return res.status(400).send("Kindly fill all required input")
        }


        //check if user already exist
        const existingUser = await Datas.findOne({ email })
        if (existingUser) {
            // console.log(existingUser)
            return res.status(409).send("User with this email already exist")
        } else {


            if (password != confirmPassword) {
                return res.status(400).send("password doestn't match")
            }

            //Encrypt user password
            const encryptedPassword = await bcrypt.hash(password, 10)

            //add user to DB
            const data = await Datas.create({
                first_name,
                last_name,
                nominate,
                location,
                phone_number,
                email: email.toLowerCase(),
                password: encryptedPassword
            })

            //create a   token
            const token = jwt.sign({
                user_id: data._id,
                email
            },
                process.env.TOKEN_KEY
            )

            data.token = token

            // await sendOTPVerificationMail(user, res)
            res.status(201).json({
                id: data._id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                nominate: data.nominate,
                location: data.location,
                phone_number: data.phone_number,


                token,
                message: "Data created successfully",
                status_code: 201
            })

        }

    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message,
            status_code: 400
        })
    }

}

module.exports = { login, signUp, crm }

