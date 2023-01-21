import app from "../../app";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("product router", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });
  describe("product is empty", () => {
    it("should return 404", async () => {
      const productId = "product-123";
      const res = await request(app).get(`/api/products/${productId}`);
      expect(res.statusCode).toEqual(404);
    });
    it("returns status code 401, unauthorized user can not create product", async () => {
      const sampleProduct = {
        name: "xyz",
        description: "sample project",
        price: 200,
        category: "sample",
        Stock: 5,
      };
      const res = await request(app)
        .post("/api/admin/product/new")
        .send(sampleProduct);
      expect(res.statusCode).toEqual(401);
    }, 200000);
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
});
