const router = require("express").Router();
const { validate, Category } = require("../models/categoryModel");

//* GET route..
router.get("/", async (req, res) => {
  try {
    const category = await Category.find().exec();
    res.json({ status: true, data: category });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

// * POST route...
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let category = new Category({
      type: req.body.type,
    });
    await category.save();
    res.status(200).json({
      status: true,
      message: "New Category saved successfully..",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});
module.exports = router;
