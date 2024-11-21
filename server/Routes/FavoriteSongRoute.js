const express = require("express");
const verifyToken = require("../Middlewares/verifyToken");
const {
  createFavoriteSong,
  deleteFavoriteSong,
  getAllUser,
  getHighFavoriteSong
} = require("../Controllers/favoriteSongController");

const router = express.Router();

router.post("/create/:songId", verifyToken, createFavoriteSong);

router.get("/delete/:songId", verifyToken, deleteFavoriteSong);

router.get("/getAllUser", verifyToken, getAllUser);

router.get("/getHotSong", getHighFavoriteSong);

module.exports = router;
