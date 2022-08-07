import { React, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Testimonials.scss';

const Testimonials = () => {
  /*
    We will utilize 3 states:
    1. The brands of companies that you worked with.
    2. The actual testimonials, which include an image, feedback,
    name, and company

    3. The current index which controls which testimonial we are at.
  */
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Event handler that sets the current index from what was
  // passed in the callback function.
  const handleClick = (index) => {
    setCurrentIndex(index);
  }

  // Here, we are just fetching data from the Sanity client
  // that we will use to set the states.
  useEffect(() => {
    const brandsQuery = '*[_type == "brands"]';
    const testimonialsQuery = '*[_type == "testimonials"]';

    async function getBrandsAndTestimonials() {
      const brandsData = await client.fetch(brandsQuery);
      const testimonialsData = await client.fetch(testimonialsQuery);

      setBrands(brandsData); // Set brands state
      setTestimonials(testimonialsData); // Set testimonials state
    }
    getBrandsAndTestimonials();
    
  }, [])

  const currentTest = testimonials[currentIndex]

  return (
    <>
      {/* 
        If there are testimonials, then we will make each item be contained
        in a div. Each item will have an image and adiv for the content. 
        The contentsinclude a <p> element for the feedback, another div that 
        holds the name of the person providing the testimonial and the company
        they worked at.
      */}
      {testimonials.length && (
        <>
          <div className="app__testimonials-item app__flex">
            <img src={urlFor(currentTest.imgUrl)} alt="testimonial"/>
            <div className="app__testimonials-content">
              <p className="p-text">{currentTest.feedback}</p>
              <div>
                <h4 className="bold-text">{currentTest.name}</h4>
                <h5 className="p-text">{currentTest.company}</h5>
              </div>
            </div>
          </div>

          {/* 
            The following div contains the icons that will be used to move between
            testimonials. Each icon will be contained in a div that has an onClick
            property that will pass a new index into the event handler function.
          */}
          <div className="app__testimonials-buttons app__flex">
            <div className="app__flex" onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex-1)}>
              <HiChevronLeft />
            </div>
            <div className="app__flex" onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex+1)}>
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      {/*
        The following div is the container that will house all the brand images.
        Each brand image will be mapped to a motion.div element which contains
        the image of the brand.
      */}
      <div className="app__testimonials-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: 'tween' }}
            key={brand._id}
          >
            <img src={urlFor(brand.imgUrl)} alt={brand.name}/>

          </motion.div>
        ))}
      </div>
    </>
  );

}

// Wrap Testimonials component with MotionWrap HOC 
// and pass an id parameter of 'testimonials' into AppWrap
export default AppWrap(
  MotionWrap(Testimonials, 'app__testimonials'),
  'testimonials',
  'app__primarybg');
