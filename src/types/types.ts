import { Types, Document } from "mongoose";
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  ratings: number;
  images: Image[];
  category: string;
  Stock: number;
  noOfReviews: number;
  reviews: User[];
  user: Types.ObjectId;
  createdAt: Date;
}
type User = {
  user: Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
};
type Image = {
  public_id: string;
  url: string;
};
