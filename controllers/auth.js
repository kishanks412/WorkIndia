const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/model").userModel;
const validator = require('validator');


exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {

    // Validating email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validating password length
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }
    // Check if the email already exists
    const existingUser = await userModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await userModel.create({ email, password: hashedPassword });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.user_id,email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    newUser.token = token;
    newUser.password = undefined;

    // Return success response
    return res
      .status(200)
      .json({ status: "Admin Account successfully created", user_id: newUser.user_id,token });
  } catch (error) {
    console.error("Error signing up:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validating email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Checking if password is provided
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    // Finding user by email
    const user = await userModel.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.user_id, email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    user.token = token;
    user.password = undefined;

    const options = {
      expires: new Date( Date.now() + 60*60*1000),
      httpOnly:true,
    }
  

    res.setHeader("Authorization", "Bearer " + token);
    return res.cookie("token", token, options).status(200).json({
      status: "Login successful",
      user_id: user.user_id,
      token,
      user
    });

  } catch (error) {
    // console.error("Database error:", error);
    return res.status(401).json({ status: "Incorrect username/password provided. Please retry" });
  }
};
