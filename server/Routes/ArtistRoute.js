const express = require("express");
const { artistValidate } = require("../Validators/artistValidate");
const verifyToken = require("../Middlewares/verifyToken");
const verifyAdmin = require("../Middlewares/verifyAdmin");
const {
  createArtist,
  updateArtist,
  deleteArtist,
  getIdArtist,
  getAllArtist,
} = require("../Controllers/artistController");

const router = express.Router();

router.post(
  "/create",
  verifyToken,
  verifyAdmin,
  artistValidate(),
  createArtist
);
router.post(
  "/update/:id",
  verifyToken,
  verifyAdmin,
  artistValidate(),
  updateArtist
);
router.get("/delete/:id", verifyToken, verifyAdmin, deleteArtist);
router.get("/getId/:id", getIdArtist);
router.get("/getAll", getAllArtist);

module.exports = router;
