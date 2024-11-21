const express = require("express")
const verifyToken = require("../Middlewares/verifyToken");
const { createComment, updateComment, deleteComment, getAllComment } = require("../Controllers/commentController");

const router = express.Router();

router.post("/create/:songId", verifyToken, createComment)
router.post("/update/:id", verifyToken, updateComment)
router.get("/delete/:id", verifyToken, deleteComment)
router.get("/getAll/:songId", getAllComment)

module.exports = router;