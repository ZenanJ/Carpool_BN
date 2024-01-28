const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const verifyToken = require('../middleware/auth');
const validator = require('validator'); 

const router = express.Router();
const secretKey = 'WhatIsThis'; // Same key as in auth middleware

router.post("/welcome", verifyToken, (req, res) => {
  return res.status(200).send("Welcome 🙌 ");
});

router.post("/register", async (req, res) => {
  try {
    // Get user input
    const {
      personalBasicInfo: {
        email,
        firstName,
        lastName,
        phone_num
      },
      password
    } = req.body;

    console.log("phone: " + phone_num + " password: " + password);

    // Validate user input
    if (!(email && phone_num && password && firstName && lastName)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUserEmail = await User.findOne({ email });
    const oldUserPhoneNum = await User.findOne({ phone_num });
    if (oldUserEmail || oldUserPhoneNum) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    
    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      phone_num,
      password: encryptedPassword,
    });

    // Create a new object with the desired fields (excluding 'password')
    const userWithoutPassword = {
      _id: user._id, // Assuming '_id' is your user's unique identifier
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_num: user.phone_num,
    };
    // return new user
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

router.post("/login", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { phone_num, password } = req.body;
    console.log("phone: " + phone_num + " password: " + password);

    // Validate user input
    if (!(phone_num && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ phone_num });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, phone_num },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
  }
  // Our register logic ends here
});

module.exports = router;
