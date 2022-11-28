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
  user?: Types.ObjectId;
  createdAt: Date;
}
type User = {
  user: string;
  name?: string;
  rating: number;
  comment: string;
};
type Image = {
  public_id: string;
  url: string;
};

// ============= User type =======
interface UserModel {
  name: string;
  email: string;
  password: string;
  avatar?: Avatar;
  role: string;
  createdAt: Date;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
}
export interface IUser extends UserModel, Document {
  comparePassword: (password: string) => Promise<boolean>;
  getJWTToken: () => Promise<string>;
  getResetPasswordToken: () => Promise<string>;
}
type Avatar = {
  public_id: string;
  url: string;
};

//=========== Order type ========================
type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
  phoneNo: string;
};

type OrderItem = {
  name: string;
  price: number;
  quantity: number;
  image: string;
  product: Types.ObjectId;
};
export interface IOrder extends Document {
  shippingInfo: ShippingInfo;
  orderItems: OrderItem[];
  user: Types.ObjectId;
  paymentInfo: {
    id: string;
    status: string;
  };
  paidAt: Date;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus: string;
  deliveredAt: Date;
  createdAt: Date;
}
