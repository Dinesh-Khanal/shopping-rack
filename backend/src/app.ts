import express from "express";
import product from "./routes/productRoute";
import user from "./routes/userRoute";
import errorHandler from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(fileUpload());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cookieParser());

app.get("/ping", (_req, res) => {
  res.send("pong");
});
app.use("/api", product);
app.use("/api", user);

app.use(errorHandler);
export default app;
