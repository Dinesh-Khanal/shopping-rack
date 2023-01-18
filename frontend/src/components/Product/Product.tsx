import React from 'react';

import { IProduct } from '../../redux/types';
import styles from '../styles/Product.module.css';
type IProps = {
  product: IProduct;
};
const Product = ({ product }: IProps) => {
  const pImage = product.images && product.images[0];
  return (
    <div className={styles.product}>
      <img src={pImage ? pImage.url : 'noimage.jfif'} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: Rs.{product.price}</p>
      <p>Stock: {product.Stock}</p>
      <p>rating: {product.ratings}</p>
    </div>
  );
};

export default Product;
