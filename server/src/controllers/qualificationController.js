const Qualification = require("../models/qualificationSchema");
const { StatusCodes } = require("http-status-codes");

const createQualification = async (req, res) => {
  try {
    const qualification = new Qualification(req.body);
    const savedQualification = await qualification.save();
    res.status(201).json(savedQualification);
  } catch (err) {
    res.status(400).json({ error: "Could not create the qualification" });
  }
};
const getAllQualification = async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.status(200).json(qualifications);
  } catch (err) {
    res.status(500).json({ error: "Could not retrieve qualifications" });
  }
};

const getSingleQualification = async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    if (!qualification) {
      return res.status(404).json({ error: "Qualification not found" });
    }
    res.status(200).json(qualification);
  } catch (err) {
    res.status(500).json({ error: "Could not retrieve the qualification" });
  }
};

const updateQualification = async (req, res) => {
  try {
    console.log(req.params);
    const qualification = await Qualification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!qualification) {
      return res.status(404).json({ error: "Qualification not found" });
    }
    res.status(200).json(qualification);
  } catch (err) {
    res.status(500).json({ error: "Could not update the qualification" });
  }
};

const deleteQualification = async (req, res) => {
  try {
    const qualification = await Qualification.findByIdAndRemove(req.params.id);
    if (!qualification) {
      return res.status(404).json({ error: "Qualification not found" });
    }
    res.status(204).json(qualification);
  } catch (err) {
    res.status(500).json({ error: "Could not delete the qualification" });
  }
};

module.exports = {
  deleteQualification,
  updateQualification,
  getSingleQualification,
  getAllQualification,
  createQualification,
};
