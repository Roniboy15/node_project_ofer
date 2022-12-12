const mongoose = require("mongoose");
const Joi = require("joi");

const toySchema = new mongoose.Schema({
    name: String,
    info: String,
    category_id: String,
    img_url: String,
    price: Number,
    user_id: String
})

exports.ToyModel = mongoose.model("toys", toySchema);

exports.validateToy = (reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(20).required(),
        info: Joi.string().min(2).max(1000).required(),
        category_id: Joi.string().min(2).max(1000).required(),
        img_url: Joi.string().min(2).max(1000).allow(null, ""),
        price: Joi.number().min(1).max(1000).required(),   
     })
    return joiSchema.validate(reqBody);

}

