const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 20,
    minlength: 4,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
});

//! create a model to compile the schema...
const User = mongoose.model("User", userSchema);

// todo; Create a validation function(for Front-end)....
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

module.exports.User = User;
exports.validate = validateUser;
