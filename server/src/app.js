require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");

//connectDB
const connectDB = require("./src/infrastructure/db/connect");
// const authenticateUser = require("./middleware/authentication");

//routers
const authTeacherRouter = require("./src/routers/authTeacherRouter");
const changePasswordRouter = require("./src/routers/changePasswordRouter");

// error handler
// const notFoundMiddleware = require("./middleware/not-found");
// const errorHandlerMiddleware = require("./middleware/error-handler");

// extra packages
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/teacher", authTeacherRouter);
app.use("/api/v1/password", changePasswordRouter);

// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

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
