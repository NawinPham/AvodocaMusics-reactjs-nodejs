const express = require("express");
const { genreValidate } = require("../Validators/genreValidate");
const verifyToken = require("../Middlewares/verifyToken");
const verifyAdmin = require("../Middlewares/verifyAdmin");
const {
  createGenre,
  updateGenre,
  deleteGenre,
  getIdGenre,
  getAllGenre,
  getAllGenreSong
} = require("../Controllers/genreController");

const router = express.Router();

router.post("/create", verifyToken, verifyAdmin, genreValidate(), createGenre);
router.post(
  "/update/:id",
  verifyToken,
  verifyAdmin,
  genreValidate(),
  updateGenre
);
router.get("/delete/:id", verifyToken, verifyAdmin, deleteGenre);
router.get("/getId/:id", getIdGenre);
router.get("/getAll", getAllGenre);
router.get("/getAllGenreSong/:id", getAllGenreSong);


module.exports = router;
