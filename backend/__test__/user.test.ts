import request from "supertest";
import app from "../app";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
//import sendToken from "../utils/sendToken";

describe("User router", () => {
  const userPayload = {
    email: "example@xyz.com",
    password: "apple@321",
  };
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  it("returns status code 404 if user is not already registered", async () => {
    const { statusCode, text } = await request(app)
      .post("/api/login")
      .send(userPayload);
    expect(statusCode).toEqual(404);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { message } = JSON.parse(text);
    expect(message).toBe("Invalid credential");
  }, 20000);
  it("returns status code 200 if user is signed in", async () => {
    const result = await request(app).post("/api/login").send(userPayload);
    console.log(result.statusCode);
    //not completed yet
  });
});
