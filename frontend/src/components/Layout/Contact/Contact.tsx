import { Button } from '@mui/material';
import React from 'react';

import styles from './Contact.module.css';

const Contact = () => {
  return (
    <div className={styles.contactContainer}>
      <a className="mailBtn" href="mailto:dineshkhanal@gmail.com">
        <Button>Contact Me: dineshkhanal@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
