import { React, useState, useEffect }from 'react'
import { motion } from 'framer-motion'

import { urlFor, client } from '../../client'
import { AppWrap, MotionWrap } from '../../wrapper'
import './About.scss';

const About = () => {

  // Create state regarding the abouts objects from sanity.
  // The initial state will be an empty array.
  const [abouts, setAbouts] = useState([])

  // Since we are fetching the abouts objects from Sanity
  // we need to use the useEffect hook.
  useEffect(() => {
    const query = '*[_type == "abouts"]'

    // Declare an asynchronous function since we
    // are using the fetch method.
    async function getAbouts() {
      const data = await client.fetch(query)

      /*
        Right now, I want to sort my Abouts data
        alphabetically. To do so, I will call the sort array
        to sort each About by their title.
      */
      data.sort((a,b) => (a.title > b.title ? 1 : -1))

      setAbouts(data)
    }

    getAbouts()

  }, [])

  return (
    <>
      <h2 className="head-text">I love to<span> code</span><br /> and <span> solve problems</span></h2>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="app__profile-item"
            key={about.title + index}
          >
            {/* To use the Abouts schema, we must access the correct property names
              An about has
              - 'title' property
              - 'description' property
              - 'imgUrl' property
            */}
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20}}>{about.title}</h2>
            <p className="p-text" style={{ marginTop: 10}}>{about.description}</p>
          </motion.div>
        ))}
      </div>
    </>
  )
}

// Wrap About component with MotionWrap HOC 
// and pass an id parameter of 'about' into AppWrap
export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg')