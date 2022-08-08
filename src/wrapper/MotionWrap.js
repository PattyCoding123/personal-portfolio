import React from 'react';
import { motion } from 'framer-motion';

/*
    Higher order component which will wrap each component in a motion.div
    that will make an appearing animation whenever the section comes
    into view.

    The classNames parameter is meant to style this main motion.div
    element since the containers have been coded with fragments
    as the parent element. The SCSS selectors of app__componentName
    will now target this motion.div from the other SCSS files from the 
    container folders.
*/  

const MotionWrap = (Component, classNames) => function HOC() {
  return (
    <motion.div
        // This motion.div will animate each section such that whenever they
        // come into view, they appear as they are coming into the page.
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1]}}
        transition={{ duration: 0.5 }}
        className={`${classNames} app__flex`}
    >
        <Component />
    </motion.div>
  )
}

export default MotionWrap
