import React from 'react';

import { IProductState } from '../../redux/productSlice';
import Product from '../Product/Product';
import styles from './Home.module.css';
interface IProps {
  productState: IProductState;
}
const Home = ({ productState }: IProps) => {
  const { product_data, status, errorMessage } = productState;
  if (status === 'LOADING') return <div>Loading ...</div>;
  return (
    <section className={styles.home}>
      <div className={styles.category}>Category</div>
      <div className={styles.product_list}>
        {errorMessage && <div>Error: {errorMessage}</div>}
        <h1>Products</h1>
        <ul>
          {product_data.products.map((product) => (
            <li key={product._id}>
              <Product product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
