const mongoose = require("mongoose");
const Joi = require("joi");

// ! create schema...
const categorySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 15,
    unique: true,
  },
});

//! create a model to compile the schema
const Category = new mongoose.model("Category", categorySchema);

// todo; Create a validation function....
function validateCategory(category) {
  const schema = Joi.object({
    type: Joi.string().min(3).required(),
  });

  return schema.validate(category);
}

exports.Category = Category;
exports.validate = validateCategory;
