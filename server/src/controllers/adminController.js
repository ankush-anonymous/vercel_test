const Admin = require("../models/adminSchema");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const createAdmin = async (req, res) => {
  try {
    const { name, phoneNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newAdmin = new Admin({ name, phoneNumber, password: hashedPassword });
    await newAdmin.save();

    const token = newAdmin.createJWT();
    res.status(StatusCodes.CREATED).json({ admin: newAdmin, token });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Unable to create admin." });
  }
};

const getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(StatusCodes.OK).json({ admins });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Unable to fetch admin users." });
  }
};

const getSingleAdmin = async (req, res) => {
  try {
    const { _id } = req.params;
    const admin = await Admin.findById(_id);
    if (!admin) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Admin user not found." });
    } else {
      res.status(StatusCodes.OK).json({ admin });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Unable to fetch admin user." });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, phoneNumber, password } = req.body;
    const admin = await Admin.findById(_id);
    if (!admin) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Admin user not found." });
      return;
    }
    admin.name = name || admin.name;
    admin.phoneNumber = phoneNumber || admin.phoneNumber;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the new password
      admin.password = hashedPassword;
    }
    await admin.save();
    res.status(StatusCodes.OK).json({ admin });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Unable to update admin user." });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { _id } = req.params;
    const admin = await Admin.findById(_id);
    if (!admin) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Admin user not found." });
      return;
    }
    await admin.remove();
    res
      .status(StatusCodes.OK)
      .json({ message: "Admin user deleted successfully." });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Unable to delete admin user." });
  }
};

const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      throw new BadRequestError(
        "Please provide both phone number and password"
      );
    }

    const admin = await Admin.findOne({ phoneNumber });

    if (!admin) {
      throw new UnauthenticatedError("Invalid credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid credentials");
    }

    const token = admin.createJWT();

    res
      .status(StatusCodes.OK)
      .json({ user: { name: admin.name }, token, phoneNumber });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to log in" });
  }
};

module.exports = {
  createAdmin,
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  login,
};
