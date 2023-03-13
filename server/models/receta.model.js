const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const recetaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        minlength: 2,
    },
    foto: {
        type: String,
        required: true,
    },
    ingredientes: {
        type: String,
        required: true,
        minlength: 10,
    },
    instrucciones: {
        type: String,
        required: true,
        minlength: 10,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: { type: Date, default: Date.now },
});

const Receta = mongoose.model("Receta", recetaSchema);

function validateReceta(receta) {
    const schema = Joi.object({
        titulo: Joi.string().required().min(2),
        ingredientes: Joi.string().required().min(15),
        instrucciones: Joi.string().required().min(10),
    });
    return schema.validate(receta);
}

exports.Receta = Receta;
exports.validateReceta = validateReceta;

