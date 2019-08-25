const path = require("path");
const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src/views"));

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true
  })
);

const userRouter = require("./src/routes/users.js");
const taskRouter = require("./src/routes/tasks.js");
const globalErrorHandler = require("./src/controllers/errorController");
const APIError = require("./src/utils/apiError");
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again in an hour!"
// });

// app.use("/api", limiter);
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("*", (req, res, next) => {
  return next(new APIError(`${req.originalUrl} is not a valid route`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
