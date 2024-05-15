const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const { createsecrettoken } = require("../utils/jwt/createToken");

const signUp = async (req, res, next) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    if (!email || !password || !firstname) {
      return res.status(401).send("Please provide your credentials");
    }
    const existinguser = await User.findOne({ email });
    // console.log(existinguser);
    if (existinguser) {
      return res.status(409).json({ message: "User already exits" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedpassword,
      firstname,
      lastname,
    });
    const saveduser = await user.save();
    const token = createsecrettoken(saveduser._id);
    res.cookie("token", token, { expiresIn: "1h" });
    res.status(201).json(saveduser);
  } catch (err) {
    console.log("Error while signing up", err);
    next();
  }
};

module.exports = {
  signUp,
};
