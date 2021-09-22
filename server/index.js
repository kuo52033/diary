import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import postsRouter from "./routes/posts.js";
import userRouter from "./routes/user.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
const CORS_OPTIONS = {
  origin: [
    "http://localhost:3000",
    "https://determined-yalow-f69948.netlify.app",
  ],
  credentials: true,
};

dotenv.config();

app.use(
  "/static",
  express.static("public", {
    maxAge: "5000000",
  })
);
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors(CORS_OPTIONS));

app.use("/posts", postsRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server is running on port ${PORT}!!`))
  )
  .catch((err) => console.log(err));
