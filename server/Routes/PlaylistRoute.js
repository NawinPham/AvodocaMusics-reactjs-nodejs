const express = require("express");
const validatePlaylistRequestBody = require("../Validators/playlistValidate");
const verifyToken = require("../Middlewares/verifyToken");
const verifyAdmin = require("../Middlewares/verifyAdmin");
const {
  createPlaylist,
  updatePlaylist,
  getIdPlaylist,
  getAllUserPlaylist,
  deletePlaylist,
  searchPlaylist,
  getAll
} = require("../Controllers/playlistController");

const router = express.Router();

router.post("/create", verifyToken, validatePlaylistRequestBody, createPlaylist);
router.post("/update/:id", verifyToken, validatePlaylistRequestBody, updatePlaylist);
router.get("/delete/:id", verifyToken, deletePlaylist);
router.get("/getId/:id", getIdPlaylist);
router.get("/getAll", getAll);
router.get("/getAllUserPlaylist", verifyToken, getAllUserPlaylist);
router.get("/search", searchPlaylist);

module.exports = router;
