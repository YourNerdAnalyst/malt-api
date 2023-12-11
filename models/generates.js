const mongoose = require('mongoose');
const Schema = mongoose.Schema

const GenerateSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true, // Set the unique property to true
        required: true // Optional: If the email field is required
    },
    description: {
        type: String,
        required: true,
    },
    squadName: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
});

const Generate = mongoose.model('Generate', GenerateSchema);

module.exports = { Generate };
