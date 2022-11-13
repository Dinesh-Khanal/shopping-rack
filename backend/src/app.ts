import express from "express";
import product from "./routes/productRoute";
import errorHandler from "./middlewares/errorHandler";

const app = express();
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});
app.use("/api", product);

app.use(errorHandler);
export default app;
