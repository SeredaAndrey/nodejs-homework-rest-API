const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cron = require("node-cron");

require("dotenv").config();

const { contactsRouter } = require("./routes/api/contactsRouter");
const { authRouter } = require("./routes/api/authRouter");
const { userRouter } = require("./routes/api/userRouter");
const { filesRouter } = require("./routes/api/filesRouter");
const { errorHandler } = require("./errorHandler/errors");
const { deleteTempFile } = require("./controller/filesController");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/users", userRouter);
app.use("/api/users", filesRouter);
app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

cron.schedule("*/5 * * * *", () => {
  deleteTempFile();
});

module.exports = app;
