import mongoose from "mongoose";

const dbConnect = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  mongoose
    .connect(process.env.DB_URI as string)
    .then((data) =>
      console.log(`MongoDb connected to host ${data.connection.host}`)
    )
    .catch((err: Error) => console.log(err.message));
};

export default dbConnect;
