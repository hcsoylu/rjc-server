//dotenv and async-error handler
require("dotenv").config();
require("express-async-errors");

const errorHandlerMiddleware = require("./middleware/error-handler");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");

//app setup
const express = require("express");
const app = express();

//require routes
const authRouter = require("./routes/auth");
const jobRouter = require("./routes/jobs");

//body
app.use(express.json());

app.use(helmet());
app.use(cors());

//connectDB
const connectDB = require("./db/connect");

//routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobRouter);

app.use(errorHandlerMiddleware);

const PORT = 5000;

//listen app - mongodb connection
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, () => {
      console.log(`server running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
