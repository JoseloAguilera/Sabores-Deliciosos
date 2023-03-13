const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
/* const config = require("config"); */
const dotenv = require("dotenv");

const userSchema = new mongoose.Schema({
nombre: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
},
email: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
    unique: true,
},
password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
},
createdAt: { type: Date, default: Date.now },
favoritos: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Receta",
    },
    ],
});

dotenv.config();

userSchema.methods.generateToken = function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.jwtKey
    );
    return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
const schema = Joi.object({
    nombre: Joi.string().min(2).required(),
    email: Joi.string().min(8).required().email(),
    password: Joi.string().min(8).required(),

});
    return schema.validate(user);
}

function validateFavorites(data) {
    const schema = Joi.object({
        favoritos: Joi.array().required(),
    });
    return schema.validate(data, {
        abortEarly: false,
    });
}

exports.User = User;
exports.validate = validateUser;
exports.validateFavorites = validateFavorites;
