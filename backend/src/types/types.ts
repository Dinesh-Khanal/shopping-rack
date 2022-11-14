import { Types, Document } from "mongoose";

//======== Product type ========
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  ratings?: number;
  images?: Image[];
  category: string;
  Stock: number;
  numOfReviews?: number;
  reviews?: User[];
  user: Types.ObjectId;
  createdAt: Date;
}
type User = {
  user: string | unknown;
  name?: string;
  rating: number;
  comment: string;
};
type Image = {
  public_id: string;
  url: string;
};

// ============= User type =======
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: Avatar;
  role: string;
  createdAt: Date;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
}

type Avatar = {
  public_id: string;
  url: string;
};
