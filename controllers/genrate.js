const { Generate } = require('../models/generates')
const cloudinary = require('cloudinary').v2;
require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET
});


// Endpoint to generate and save data
const generateData = async (req, res) => {
    try {
        const { name, phone_number, description, email, squadName, } = req.body;
        const imageUrl = req.file.path;

        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(imageUrl);


        // newFormData.imageUrl = result.secure_url;

        const newFormData = new Generate({
            name,
            email,
            phone_number,
            description,
            squadName,
            imageUrl: result.secure_url
        });


        await newFormData.save();

        // to save data to data base
        res.status(200).json({
            newFormData,
            status_code: 200,
            status: "SUCCESS",
            message: "Generate user successful",
        });

    } catch (error) {
        console.error('Error saving data:', error.message);
        res.status(500).json({ error: 'This Email Already generated' });
    }
}



const getGenerateUSer = async (req, res) => {
    try {
        const contestant = await Generate.findOne({ email: req.params.email });


        // Find the contestant by email in the database

        if (!contestant) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json({
            contestant,
            status_code: 200,
            status: "SUCCESS",
            message: "Get user successful",
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}



module.exports = { generateData, getGenerateUSer }