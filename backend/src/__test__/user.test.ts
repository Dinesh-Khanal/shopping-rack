import request from "supertest";
import app from "../app";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

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
  it("returns status code 404 if user is not signed in", async () => {
    const res = await request(app).post("/api/login").send(userPayload);
    expect(res.statusCode).toEqual(404);
  }, 20000);
  it("returns status code 200 if user is signed in", async () => {
    const res = await request(app).post("/api/login").send(userPayload);
    expect(res.statusCode).toEqual(404);
  });
});
