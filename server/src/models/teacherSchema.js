const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const teacherSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
  },

  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zAZ]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  dateOfBirth: {
    type: Date,
  },
  phoneNumber: {
    type: Number,
    unique: true,
    trim: true,
  },
  teachersAddress: {
    buildingOrHouseNumber: {
      type: String,
      trim: true,
    },
    locality: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    pinCode: {
      type: Number,
    },
  },
  hotspots: {
    type: [String],
  },
  subjects: {
    type: [String],
  },
  levelOfTeaching: {
    type: [String],
  },
  modeOfTeaching: {
    type: [String],
    default: "classroom study",
  },
  yearsOfExperience: {
    type: Number,
  },
  achievements: {
    type: [String],
    default: ["nothing"],
  },

  nameOfQualification: {
    type: [String],
  },
  pictureOfCertificate: {
    type: String,
  },
  advertisementOfTeacher: {
    type: String,
  },

  userProfilePicture: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },

  password: {
    type: String,
    minlength: 6,
  },

  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  monthlyCharges: {
    type: Number,
    trim: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isRegistered: {
    type: Boolean,
    default: false,
  },
});

//to increment userId by 1
teacherSchema.pre("save", async function (next) {
  if (!this.userId) {
    // Find the maximum 'userId' in the collection
    const maxUserId = await this.constructor
      .find()
      .sort({ userId: -1 })
      .limit(1);
    const newUserId = maxUserId.length === 0 ? 1 : maxUserId[0].userId + 1;

    if (newUserId <= 100000000) {
      this.userId = newUserId;
      next();
    } else {
      next(new Error("Maximum 'userId' limit reached."));
    }
  } else {
    next();
  }
});

//generate JWT token
teacherSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

module.exports = mongoose.model("Teacher", teacherSchema);
