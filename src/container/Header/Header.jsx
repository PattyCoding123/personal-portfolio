import React from 'react';
import { motion } from 'framer-motion';

import { images } from '../../constants';
import { AppWrap } from '../../wrapper';
import './Header.scss';

const scaleVariants = {
  // Make the tech image circles appear larger and more visible
  // over the duration of 1 second.
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut'
    }
  }
}

const Header = () => {

  // Give div of Header an id of "home" for CSS purposes
  return (
    <div className="app__header app__flex">
      {/* 
        Info in the header will be animated using motion.div

        whileInView will make the intro badge and tag float to
        the right while gaining opacity

        transition will make this animation duration 0.5 seconds
      */}
      <motion.div
        whileInView={{ x: [-100,0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="app__header-info"
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex">
            <span>👋</span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">Hello, I am</p>
              <h1 className="head-text\">Patrick Ducusin</h1>
            </div>
          </div>

          <div className="tag-cmp app__flex">
            <p className="p-text">C.S. Student</p>
            <p className="p-text">Web Developer</p>
          </div>
        </div>

      </motion.div>

      {/* 
        Profile picture and circular background will be held 
        and animated using motion.div 

        whileInView will make the div go completely opaque
        such that the profile image and circular background
        become fully visible

        transition will make this animation duration 0.5 
        and make the children motion elements NOT START
        until 0.5 seconds after the transition animation
        has ended.
      */}  
      <motion.div
        whileInView={{opacity: [0, 1] }}
        transition={{ duration: 1, delayChildren: 0.5 }}
        className="app__header-img"
      >
        {/* Replace with an image of yourself */}
        <img className="app__header-profileImg" src={images.myProfileModified} alt="profile_bg"/>

        {/* Circle that is to appear behind the profile picture */}
        <motion.img
          whileInView={{scale: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          src={images.circle}
          alt="profile_circle"
          className="overlay_circle"
        />
      </motion.div>

      {/* 
        Technologies to appear by the profile picture will be handled
        by this motion.div
        
        The scaleVariants property is a set of pre-defined animation
        properties. It is better to do this for attributes instead
        of defining them right away in the attributes IF there 
        are a lot of properties we have to define.

      */}
      <motion.div
        variant={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className="app__header-circles"
      >
        {[images.flutter, images.javascript, images.react].map((circle, index) => (
          // The images are contained under a div so we can just edit them
          // easier in the SCSS file.
          <div className="circle-cmp app__flex" key={`circle-${index}`}>
            <img src={circle} alt="circle"/>
          </div>
        ))}
      </motion.div>


    </div>
  )
}

// Wrap Header component with HOC and pass an id name of 'home'
export default AppWrap(Header, 'home');