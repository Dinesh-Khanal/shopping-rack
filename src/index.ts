import app from "./app";
import dotenv from "dotenv";
import dbConnect from "./config/database";

// Handling Uncaught Exception
process.on("uncaughtException", (err: Error) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "./src/config/config.env" });
}

dbConnect();

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err: Error) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
