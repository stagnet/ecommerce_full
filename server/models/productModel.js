const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Owner" },
  title: { type: String, required: true, minlength: 5, maxlength: 255 },
  description: { type: String, required: true },
  photo: { type: [String], required: true },
  price: { type: Number, required: true, min: 0 },
  stockQuantity: { type: Number, min: 0 },
  review: { type: [Number] },
});

const Product = mongoose.model("Product", productSchema);

// todo; Create a validation function....
function validateProduct(product) {
  const schema = Joi.object({
    title: Joi.string().min(4).required(),
    description: Joi.string().min(8).max(255).required(),
    price: Joi.number().min(0).required(),
    stockQuantity: Joi.number().min(0).required(),
    review: Joi.number().min(0),
    categoryID: Joi.string().required(),
    ownerID: Joi.string().required(),
  });
  return schema.validate(product);
}
module.exports.Product = Product;
exports.validate = validateProduct;
