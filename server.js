const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");

const testJwtRouter = require("./controllers/test-jwt");
const authRouter = require("./controllers/auth");
const usersRouter = require("./controllers/users");
const mealsRouter = require("./controllers/meals");
const daysRouter = require("./controllers/days");
const verifyToken = require("./middleware/verify-token");

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(logger("dev"));

app.use("/auth", authRouter);
app.use("/users", verifyToken, usersRouter);
app.use("/test-jwt", testJwtRouter);
app.use("/meals", verifyToken, mealsRouter);
app.use("/days", verifyToken, daysRouter);

app.listen(3000, () => {
  console.log("The express app is ready!");
});
