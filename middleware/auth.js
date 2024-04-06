require("dotenv").config();

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  console.log("body", req.body.token);
  // console.log("cookie",req.cookies.token)
  console.log("header", req.header("Authorization"));

  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ error: "Token not provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token part after "Bearer"

  try {
      // console.log(payload);
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;
    next();
    // console.log(req.user);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "token invalid",
    });
  }
}


// exports.verifyToken = (req, res, next) => {
//     const token = req.headers["authorization"];
  
//     if (!token) {
//       return res.status(403).json({ error: "Token not provided" });
//     }
  
//     jwt.verify(token, secretKey, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ error: "Invalid token" });
//       }
//       req.user_id = decoded.user_id;
//       next();
//     });
//   }


