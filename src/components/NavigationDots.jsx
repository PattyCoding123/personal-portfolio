import React from 'react'

const NavigationDots = ({ active }) => {

  /*
    Each anchor tag appears as a dot, and depending on which section of the
    page is being rendered, that nav dot will be the secondary color.

    Since we do not have testimonials as of yet, do not include them in
    the NavigationDots component.
  */
  return (
    <div className='app__navigation'>
        {['home', 'about', 'projects', 'skills','contact'].map((item, index) => (
            <a  
              href={`#${item}`} 
              key={item + index}
              className="app__navigation-dot"
              style={active === item ? { backgroundColor: '#38bdae'} : {} }
            />    
        ))}
    </div>
  )
}

export default NavigationDots