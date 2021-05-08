const router = require("express").Router();
const { Owner, validate } = require("../models/ownerModel.js");
const _ = require("lodash");
const { upload } = require("../middlewares/uploadPhoto");

// * POST route....
router.post("/", upload.single("ownerPhoto"), async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let owner = new Owner(_.pick(req.body, ["name", "about"]));
    owner.photo = req.file.location;

    await owner.save();
    res.send(owner);
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
});

//* GET route..
router.get("/", async (req, res) => {
  try {
    const owner = await Owner.find().exec();
    res.json({ status: true, data: owner });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});
module.exports = router;
