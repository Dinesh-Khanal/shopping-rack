import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from '../styles/App.module.css';
const Layout = () => {
  return (
    <main className={styles.container}>
      <header>Nepal Shoping logo | login | signup</header>
      <Outlet />
      <footer>This is footer section</footer>
    </main>
  );
};

export default Layout;
