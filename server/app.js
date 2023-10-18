require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");

//connectDB
const connectDB = require("./src/infrastructure/db/connect");

//routers
const teacherRouter = require("./src/routers/teacherRouter");
const adminRouter = require("./src/routers/adminRouter");
const userOtpRouter = require("./src/routers/userOtpRouter");
const qualificationRouter = require("./src/routers/qualificationRouter");

// extra packages
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/teacher", teacherRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/otp", userOtpRouter);
app.use("/api/v1/qualification", qualificationRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Doctor Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
