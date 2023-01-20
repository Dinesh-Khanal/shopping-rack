import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Avatar, Button, Typography } from '@mui/material';
import React from 'react';

import styles from './aboutSection.module.css';
const About = () => {
  const visitFacebook = () => {
    //window.location = "https://www.facebook.com/dineshkhanal";
    window.open('https://www.facebook.com/dineshkhanal', '_blank');
  };
  return (
    <div className={styles.aboutSection}>
      <div></div>
      <div className={styles.aboutSectionGradient}></div>
      <div className={styles.aboutSectionContainer}>
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: '10vmax', height: '10vmax', margin: '2vmax 0' }}
              src="https://res.cloudinary.com/dkhanal/image/upload/v1652682415/avatars/ost167aegixzcmikmfwp.jpg"
              alt="Founder"
            />
            <Typography>Dinesh Khanal</Typography>
            <Button onClick={visitFacebook} color="primary">
              Visit Facebook
            </Button>
            <span>
              This is a sample web application made by Dinesh Khanal as a project
              requirement of Full Stack Open course of University of Helsinki.
            </span>
          </div>
          <div className={styles.aboutSectionContainer2}>
            <Typography component="h2">Our Brands</Typography>
            <a href="https://www.youtube.com/user/khanaldk/videos" target="blank">
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://www.facebook.com/dineshkhanal" target="blank">
              <FacebookIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
