const express = require("express");
const { roleValidate } = require("../Validators/roleValidate");
const verifyToken = require("../Middlewares/verifyToken");
const verifyAdmin = require("../Middlewares/verifyAdmin");
const {
  createHistoryListen,
  deleteHistorySong,
  getAllUserHistoryListen
} = require("../Controllers/historyListenController");

const router = express.Router();

router.post("/create/:songId", verifyToken, createHistoryListen);
router.get("/delete/:songId", verifyToken, deleteHistorySong);
router.get("/getAllUser", verifyToken, getAllUserHistoryListen);


module.exports = router;
