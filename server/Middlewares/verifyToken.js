const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  try {
    //check no token
    if (!authHeader)
      return res
        .status(401)
        .json({ message: "Access denied, no token provided." });

    // check Invalid token
    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token)
      return res
        .status(400)
        .json({ message: "Unathorized : Invalid token format" });

    // verify token
    const jwtkey = process.env.JWT_SECRET_KEY;

    jwt.verify(token, jwtkey, (error, user) => {
      if (error)
        return res.status(400).json({ message: "Forbidden: Invalid token" });

      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
