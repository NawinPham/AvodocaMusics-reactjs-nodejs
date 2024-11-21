const express = require("express");
const { roleValidate } = require("../Validators/roleValidate");
const verifyToken = require("../Middlewares/verifyToken");
const verifyAdmin = require("../Middlewares/verifyAdmin");
const {
  createRole,
  updateRole,
  getIdRole,
  getAllRole,
  deleteRole,
  searchRole,
} = require("../Controllers/roleController");

const router = express.Router();

router.post("/create", verifyToken, verifyAdmin, roleValidate(), createRole);
router.post(
  "/update/:id",
  verifyToken,
  verifyAdmin,
  roleValidate(),
  updateRole
);
router.get("/delete/:id", verifyToken, verifyAdmin, deleteRole);
router.get("/getId/:id", verifyToken, getIdRole);
router.get("/getAll", verifyToken, verifyAdmin, getAllRole);

router.get("/search", verifyToken, verifyAdmin, searchRole);

module.exports = router;
