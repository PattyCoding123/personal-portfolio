import React from 'react'

const NavigationDots = ({ active }) => {

  /*
    Each anchor tag appears as a dot, and depending on which section of the
    page is being rendered, that nav dot will be the secondary color.

  */
  return (
    <div className='app__navigation'>
        {['home', 'about', 'projects', 'skills', 'testimonials', 'contact'].map((item, index) => (
            <a  
                href={`#${item}`} 
                key={item + index}
                className="app__navigation-dot"
                style={active === item ? { backgroundColor: '#313BAC'} : {} }
            />    
        ))}
    </div>
  )
}

export default NavigationDots