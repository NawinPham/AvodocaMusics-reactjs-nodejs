const express = require("express");
const validateAlbumRequestBody = require("../Validators/albumValidate")
const verifyToken = require("../Middlewares/verifyToken");
const verifyAdmin = require("../Middlewares/verifyAdmin");
const {
  createAlbum,
  updateAlbum,
  getIdAlbum,
  getAllUserAlbum,
  deleteAlbum,
  searchAlbum,
  getAll
} = require("../Controllers/albumController");

const router = express.Router();

router.post("/create", verifyToken, validateAlbumRequestBody, createAlbum);
router.post("/update/:id", verifyToken,validateAlbumRequestBody, updateAlbum);
router.get("/delete/:id", verifyToken, verifyAdmin, deleteAlbum);
router.get("/getId/:id", getIdAlbum);
router.get("/getAll", getAll);

router.get("/getAllUserAlbum", verifyToken, getAllUserAlbum);
router.get("/search", searchAlbum);

module.exports = router;
