const express = require("express");
const verifyToken = require("../Middlewares/verifyToken");
const {
  createPlaylistSong,
  deletePlaylistSong,
  getAllPlaylistSong,
} = require("../Controllers/playlistSongController");

const router = express.Router();

router.post("/create/songs/:songs_id", verifyToken, createPlaylistSong);
router.get(
  "/delete/:playlistId/songs/:songId",
  verifyToken,
  deletePlaylistSong
);
router.get("/getAll/:playlistId", getAllPlaylistSong);

module.exports = router;
