const express = require("express");
const router = express.Router();

const {
  createAdmin,
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  login,
} = require("../controllers/adminController");

router.get("/getAllAdmin", getAllAdmin);
router.get("/getSingleAdmin/:_id ", getAllAdmin);
router.post("/createAdmin", createAdmin);
router.post("/login", login);
router.delete("/deleteAdmin/:_id", deleteAdmin);
router.patch("/updateAdmin/:_id", updateAdmin);

module.exports = router;
