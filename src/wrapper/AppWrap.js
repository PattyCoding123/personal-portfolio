import React from 'react'

import { NavigationDots, SocialMedia } from '../components';

/*
  Higher-order component that will wrap a component with a 
  div that dynamically sets its id, and will also include the 
  social media icons and navigation dots into that component.
  It will also allow the components to take up all the space
  allocated to them by the div due to the styling of app_container.

  The idName is for the NavigationDots components

  The classNames parameter is meant to help with styling from
  other SCSS files such as App.scss
*/
const AppWrap = (Component, idName, classNames) => function HOC() {
  return (
    <div id={idName} className={`app__container ${classNames}`}>
        <SocialMedia />
        <div className="app__wrapper app__flex">
            <Component /> {/* Component Parameter */}
        </div>
        <NavigationDots active={idName} />
    </div>
  )
}


export default AppWrap