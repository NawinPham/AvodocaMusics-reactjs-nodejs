const verifyAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user.role_id !== 1) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

module.exports = verifyAdmin;
