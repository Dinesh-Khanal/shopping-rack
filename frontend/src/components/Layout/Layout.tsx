import React from 'react';
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';

import styles from './App.module.css';
import Footer from './Footer/Footer';
const Layout = () => {
  return (
    <main className={styles.container}>
      <input type="checkbox" id={styles.check} />
      <nav>
        <div className={styles.logo}>
          Shop<span>R</span>ack
        </div>
        <div className={styles.search_box}>
          <input type="search" placeholder="Search Products" />
          <span>
            <FaSearch />
          </span>
        </div>
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/contact">contacts</Link>
          </li>
          <li>
            <Link to="/about">about</Link>
          </li>
          <li>
            <Link to="/">login</Link>
          </li>
        </ul>
        <label htmlFor={styles.check} className={styles.bar}>
          <FaBars id={styles.bars} />
          <FaTimes id={styles.times} />
        </label>
      </nav>
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
