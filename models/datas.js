const mongoose = require('mongoose');
const Schema = mongoose.Schema

const DataSchema = Schema({
    first_name: {
        type: String,
        required: [true, "please provide your firstName"]
    },

    last_name: {
        type: String,
        required: [true, "please provide your middleName"]
    },

    email: {
        type: String,
        lowercase: true,
        required: [true, "email is required"],
        unique: [true, "email has already been registered"]
    },

    password: {
        type: String,
        required: [true, " password is required"],
        minlength: [8, "minimum password length is 8"],

    },

    phone_number: {
        type: String,
        require: [true, 'Your phone number must be 11 digit']
    },

    location: {
        type: String,
    },

    instagram_handle: {
        type: String,

    },

    description: {
        type: String
    },
    nominate: {
        type: String
    },

    image: {
        type: String
    },

    data: {
        type: Date,
        default: Date.now()
    }
})

DataSchema.methods.generateAuthToken = async () => {
    data = this
    const token = jwt.sign({ user_id: data._id.toString() }, "data token")

    return token
}


const Datas = mongoose.model("Datas", DataSchema)

module.exports = { Datas }