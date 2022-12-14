/* eslint-disable simple-import-sort/imports */
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import styles from '../styles/App.module.css';
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
            <Link to="/">contacts</Link>
          </li>
          <li>
            <Link to="/">about</Link>
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
      <footer>This is footer section</footer>
    </main>
  );
};

export default Layout;
