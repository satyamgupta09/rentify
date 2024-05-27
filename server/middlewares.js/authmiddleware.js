const jwt = require("jsonwebtoken");
const secret_key = "12345";

const jwtAuthMiddleWareUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, secret_key);
    req.userData = decoded; 
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid Token" });
  }
};

const GenerateToken = (userData) => {
  return jwt.sign(userData, secret_key, { expiresIn: 86400 });
};

module.exports = { jwtAuthMiddleWareUser, GenerateToken };
