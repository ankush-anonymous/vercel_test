const express = require("express");
const router = express.Router();

const {
  createTeacher,
  getAllTeachers,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherByPhoneNumber,
  login,
} = require("../controllers/teacherController");

router.get("/getAllTeachers", getAllTeachers);
router.get("/getSingleTeacher/:_id", getSingleTeacher);
router.get("/getTeacherByPhoneNumber/:phoneNumber", getTeacherByPhoneNumber);

router.post("/create-user", createTeacher);
router.post("/login", login);

router.patch("/update-user/:_id", updateTeacher);

router.delete("/deleteTeacher/:_id", deleteTeacher);

module.exports = router;
