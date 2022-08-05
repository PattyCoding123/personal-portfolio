import React from 'react';

import { About, Footer, Header, Skills, Projects } from './container';
import { Navbar } from './components';
import './App.scss';

// Don't include Testimonials component yet because we do
// not currently have testimonials.
const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Projects />
      <Skills />
      <Footer />
    </div>
  );
}

export default App;
