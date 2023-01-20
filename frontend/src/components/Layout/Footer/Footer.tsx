import React from 'react';

import appStore from '../../../images/Appstore.png';
import playStore from '../../../images/playstore.png';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer id={styles.footer}>
      <div className={styles.leftFooter}>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className={styles.midFooter}>
        <h1>SNEHA ONLINE SHOPPING.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; Dinesh Khanal</p>
      </div>

      <div className={styles.rightFooter}>
        <h4>Follow Us</h4>
        <a href="https://www.youtube.com/user/khanaldk/videos">Youtube</a>
        <a href="https://www.facebook.com/dineshkhanal">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
