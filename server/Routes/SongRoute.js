const express = require("express");
const validateSongRequestBody = require("../Validators/songValidate");
const verifyToken = require("../Middlewares/verifyToken");
const {
  createSong,
  updateSong,
  getIdSong,
  getAllSong,
  deleteSong,
  searchSong,
  playSong,
  getAllUserSong,
  getSongByGenre,
} = require("../Controllers/songController");

const router = express.Router();

router.post("/create", verifyToken, validateSongRequestBody, createSong);
router.post("/update/:id", verifyToken, validateSongRequestBody, updateSong);
router.get("/delete/:id", verifyToken, deleteSong);
router.get("/getId/:id", getIdSong);

router.get("/genre/:id", getSongByGenre);
router.get("/getAll", getAllSong);
router.get("/getAllUserSongs", verifyToken, getAllUserSong);

router.get("/search", searchSong);
router.get("/play/:songId", playSong);

module.exports = router;
