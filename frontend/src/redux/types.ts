export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  ratings?: number;
  images?: Image[];
  category: string;
  Stock: number;
  numOfReviews?: number;
  reviews?: User[];
  user?: string;
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
