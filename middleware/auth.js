require("dotenv").config();

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {

  console.log("cookie" , req.cookies.token);
  console.log("body" , req.body.token);
  console.log("header", req.header("Authorization"));
       
  const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
  console.log('token',token);
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
    console.log('payload', payload)
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

