const mongoose = require("mongoose");
const Joi = require("joi");

// ! create schema...
const ProductOwnerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 15 },
  about: { type: String, required: true, minlength: 10, maxlength: 200 },
  photo: { type: String },
});

//! create a model to compile the schema
const ProductOwner = new mongoose.model("Owner", ProductOwnerSchema);

// todo; Create a validation function....
function validateProductOwner(owner) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    about: Joi.string().min(5).max(200).required(),
  });

  return schema.validate(owner);
}

exports.Owner = ProductOwner;
exports.validate = validateProductOwner;
