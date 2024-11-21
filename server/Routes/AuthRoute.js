const express = require("express");
const { accountValidate } = require("../Validators/accountValidate");
const {
  RegristerUser,
  getId,
  GetAllUser,
  loginUser,
  GetProfileUser,
  deleteUser,
  updateProfile,
  updateUser,
  getGoogleUrl,
  getGoogleCallback
} = require("../Controllers/AuthController");
const verifyToken = require("../Middlewares/verifyToken");
const verifyAdmin = require("../Middlewares/verifyAdmin");

const router = express.Router();

router.post("/register", accountValidate(), RegristerUser);
router.post("/update", verifyToken, accountValidate(), updateProfile);
router.post("/updateUser/:id", verifyToken, accountValidate(), updateUser);

router.post("/login", accountValidate(), loginUser);
router.get("/GetProfileUser", verifyToken, GetProfileUser);
router.get("/deleteUser/:id", deleteUser);

router.get("/getId/:userId", getId);
router.get("/getAll", verifyToken, verifyAdmin, GetAllUser);

//The google auth url
router.get("/auth/google", getGoogleUrl);
router.get("/auth/google/callback", getGoogleCallback);

module.exports = router;
