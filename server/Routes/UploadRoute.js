const express = require("express");
const { uploadImage } = require("../Controllers/uploadsController");

const router = express.Router();

router.get("/uploadImage/:url", uploadImage);

module.exports = router;
