const router = require("express").Router();
const { Product, validate } = require("../models/productModel.js");
const _ = require("lodash");
const { upload } = require("../middlewares/uploadPhoto");
const Joi = require("joi");

// * POST request - create a new product...
router.post("/", upload.array("photo", 3), async (req, res) => {
  try {
    // * error handling for client not typing wrong or incomplete details..
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    debugger;
    let product = new Product(
      _.pick(req.body, [
        "title",
        "description",
        "price",
        "review",
        "stockQuantity",
        "ownerID",
        "categoryID",
      ])
    );
    product.photo = req.files.map((file) => file.location);
    await product.save();
    console.log(product);
    res.json({
      status: true,
      message: "Successfully saved",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// * GET request - get all list of products...
router.get("/", async (req, res) => {
  try {
    const product = await Product.find()
      .populate("category")
      .populate("owner")
      .exec();
    res.json({ status: true, data: product });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

// *GET request - get a single product....
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.json({ status: true, data: product });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

//* PUT request - update a single product...
router.put("/:id", upload.array("photo", 3), async (req, res) => {
  try {
    const { error } = updateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let product = await Product.findOneAndUpdate(
      { _id: req.params.id }, //? enter the ID to search for..
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          category: req.body.categoryID,
          owner: req.body.ownerID,
          photo: req.files.map((file) => file.location),
          description: req.body.description,
          stockQuantity: req.body.stockQuantity,
        },
      },
      { new: true }
    );
    if (!product) {
      return res
        .status(400)
        .send("The product with the given ID was not found.");
    }
    res.json({
      status: true,
      updatedProduct: product,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
});

//* DELETE request - delete a single product...
router.delete("/:id", async (req, res) => {
  try {
    let deleteProduct = await Product.findOneAndDelete({ _id: req.params.id });
    if (!deleteProduct)
      return res
        .status(400)
        .send("The product with the given ID was not found...!");

    res.json({
      status: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
});

// todo; Create a validation function for updating the product....
function updateProduct(product) {
  const schema = Joi.object({
    title: Joi.string().min(4).required(),
    description: Joi.string().min(8).max(255),
    price: Joi.number().min(0),
    stockQuantity: Joi.number().min(0),
    review: Joi.number().min(0),
    categoryID: Joi.string().required(),
    ownerID: Joi.string().required(),
  });
  return schema.validate(product);
}
module.exports = router;
