require("dotenv").config();
const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
exports.verifyToken = async (req, res, next) => {

  
       
  const token = req.cookies.token ;
  // console.log('token',token);
  if (!token) {
    return res.status(403).json({ error: "Token not provided" });
  }

  if(!token || token === undefined) {
    return res.status(401).json({
        success:false,
        message:'Token Missing',
    });
}

  try {
      // console.log(payload);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('payload', payload)
    req.user = payload;
    next();
    // console.log(req.user);
  } catch (error) {
    console.error(error)
    return res.status(401).json({
      success: false,
      message: "token invalid",
    });
  }
}

