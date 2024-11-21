const express = require("express");
const verifyToken = require("../Middlewares/verifyToken");
const {
  createAlbumSong,
  deleteAlbumSong,
  getAllUserAlbumSong,
  getAlbumBySong
} = require("../Controllers/albumSongController");

const router = express.Router();

router.post("/create/:albumId/songs/:songId", verifyToken, createAlbumSong);
router.get("/delete/:albumId/songs/:songId", verifyToken, deleteAlbumSong);
router.get("/getAllUserAlbumSong/:albumId", getAllUserAlbumSong);
router.get("/getAlbumBySong/:songId", getAlbumBySong)

module.exports = router;
