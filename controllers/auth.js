const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/model").userModel;

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await userModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await userModel.create({ email, password: hashedPassword });

    // Return success response
    return res
      .status(200)
      .json({ message: "User signed up successfully", data: newUser });
  } catch (error) {
    console.error("Error signing up:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
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
    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    user.token = token;
    
    user.password = undefined;

    const options = {
      expires: new Date(Date.now() +  60 * 60 * 1000),
      httpOnly: true, // by this we cnat accessit on client side
    };
    // we have to pass three param in cookie: name of cookie, data of cookie, options
    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "User Logged in successfully",
    });

    // Return token in response
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
