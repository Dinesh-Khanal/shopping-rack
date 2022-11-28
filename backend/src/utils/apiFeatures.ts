import { IProduct } from "../types/types";
import { Types, Query } from "mongoose";
export type QueryStrType = {
  keyword: string;
  page: string;
  limit: string;
};
export type QueryType = Query<
  (IProduct & {
    _id: Types.ObjectId;
  })[],
  IProduct & {
    _id: Types.ObjectId;
  },
  IProduct
>;
class ApiFeatures {
  //here queryStr is passing from frontend eg: http://localhost:5000/api/product?keyword=camera
  //keyword=camera is queryStr
  //in controller eg: products = await Product.find(), here Product.find() is query
  queryStr: QueryStrType;
  query: QueryType;
  constructor(query: QueryType, queryStr: QueryStrType) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    //   Removing some fields for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key as keyof QueryStrType]);

    // Filter For Price and Rating

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr) as QueryStrType);

    return this;
  }

  pagination(resultPerPage: number) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

export default ApiFeatures;
