const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/userModel");
const bcrypt = require("bcrypt");
const _ = require("lodash");

// ? GET route..
router.get("/", async (req, res) => {
  const user = await User.find().exec();
  res.send(user);
});

router.post("/", async (req, res) => {
  try {
    // * error handling for client not typing wrong or incomplete details..
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // * checking that whether the user is already exist inside Db..
    let user = await User.findOne({ email: req.body.email }).exec();
    if (user) return res.status(400).send("User is already exists...!");

    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // * starting salting and hashing password..
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // * saving the hashed password in db...
    await user.save();
    const response = _.pick(user, ["_id", "name", "email"]);
    res.json({
      status: true,
      message: "Successfully saved",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
