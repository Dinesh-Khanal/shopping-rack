import app from "./app";
import dotenv from "dotenv";

dotenv.config({ path: "./src/config/config.env" });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
