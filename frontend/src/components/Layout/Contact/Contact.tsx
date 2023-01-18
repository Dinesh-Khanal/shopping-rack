import './Contact.css';

import { Button } from '@mui/material';
import React from 'react';

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:dineshkhanal@gmail.com">
        <Button>Contact Me: dineshkhanal@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
