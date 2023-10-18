const express = require("express");
const router = express.Router();
const qualificationController = require("../controllers/qualificationController");

// Create a new qualification
router.post(
  "/create-qualification",
  qualificationController.createQualification
);

// Get all qualifications
router.get(
  "/getall-qualifications",
  qualificationController.getAllQualification
);

// Get a single qualification by ID
router.get(
  "/getsingle-qualifications/:id",
  qualificationController.getSingleQualification
);

// Update a qualification by ID
router.patch(
  "/update-qualifications/:id",
  qualificationController.updateQualification
);

// Delete a qualification by ID
router.delete(
  "/delete-qualifications/:id",
  qualificationController.deleteQualification
);

module.exports = router;
