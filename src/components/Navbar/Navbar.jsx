import {React, useState } from 'react'
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { images } from '../../constants';
import './Navbar.scss';

const Navbar = () => {
const [toggle, setToggle] = useState(false);

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        {/* Replace with an image of your own logo */}
        <img src={images.myLogo} alt="logo" />
      </div>
      <ul className="app__navbar-links">
        {/* 
          Move into JS syntax using {} since we are inserting
          an array directly into the ul.

          This array is used to create list elements of 
          anchor tags that will appear in the nav. When the
          user clicks on the link, it will move them to that
          section of the webpage.

          Currently, since we have no testimonials as of yet,
          we will exclude them from the navbar for now.
        */}
        {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
        <li className="app__flex p-text" key={`link-${item}`}>
          <div /> {/* This div is used to create a circle over the links when
          hovering over them */}
          <a href={`#${item}`}>{item}</a>
        </li>
        ))}
      </ul>

      {/* Hamburger-style dropbar for mobile devices */}
      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)}/>

        {/* 
          If toggle state is true, the menu is rendered
          onto the screen using Framer-Motion's motion.div

          The 'whileInView' shows how far the element 
          will render, and transition sets the duration
          and type of transition the element will do.
        */}
        {toggle && (
          <motion.div
            whileInView={{ x: [250, 0] }}
            transition={{duration: 0.85, ease: 'easeOut'}}
          >
            {/* hamburger menu X button*/}
            <HiX onClick={() => setToggle(false)}/>
            <ul className="app__navbar-links">

              {/*
                Don't include testimonials yet as we have no testimonials.
              */}
              {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
                <li key={item}>
                  {/* 
                    The anchor's onClick property will close it
                    so the user can read the section it leads to.  
                  */}
                  <a href={`#${item}`} onClick={() => setToggle(false)}>{item}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar