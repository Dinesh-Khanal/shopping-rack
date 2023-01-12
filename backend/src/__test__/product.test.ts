import app from "../app";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose from "mongoose";
import Product from "../models/productModel";

describe("product router", () => {
  const productPayload = {
    name: "xyz",
    description: "sample project",
    price: 200,
    category: "sample",
    Stock: 5,
  };
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  describe("product is empty", () => {
    it("should return 400", async () => {
      const productId = "product123";
      const res = await request(app).get(`/api/product/${productId}`);
      expect(res.statusCode).toEqual(400);
    });
    it("returns status code 401 if user is not signed", async () => {
      const res = await request(app)
        .post("/api/admin/product/new")
        .send(productPayload);
      expect(res.statusCode).toEqual(401);
    });
    it("should return a 200 status and the product detail", async () => {
      const product = await Product.create(productPayload);
      //@ts-ignore
      const { _body, statusCode } = await request(app).get(
        `/api/product/${product._id}`
      );
      expect(statusCode).toBe(200);
      expect(_body.product.name).toBe(product.name);
    });
  });
});
