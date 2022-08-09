import { React, useState, useEffect } from 'react'
import { BsLinkedin } from 'react-icons/bs'

import { images } from '../../constants'
import { AppWrap, MotionWrap } from '../../wrapper'
import { client } from '../../client'
import './Footer.scss';

const Footer = () => {
  /*
    We will be utilizing 3 states:
    1. The form data that the user will enter if they want to
    send a message. We will delegate the values of these states
    to the forms because we want controlled components.

    2. isFormSubmitted to indicate that the user's message was 
    successfully submitted

    3. The isLoading state to tell the user whether the form
    is still trying to send.
  */
  const [formData, setFormData] = useState(
    {
      name: '',
      email: '',
      message: '',
    }
  )

  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { name, email, message } = formData

  // Event handler for the forms whenever a user changes input
  // for the forms.
  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  /*
    Submit Event Handler:

    When the submit button is pressed, it will post
    information to the Sanity client regarding the message
    and email and full name of the person.
  */
  const handleSubmit = () => {
    setIsLoading(true)

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message,
    }

    client.create(contact)
      .then(() => {
        setIsLoading(false)
        setIsFormSubmitted(true)
      })
  }

  return (
    <>
      <h2 className="head-text">If you would like to contact me...</h2>

      {/*
        The following div contains the contact cards for the contact footer.
        The div will contain two 'card' anchor tags that each contain a div.
        Each div will contain an image some form of text.

        I prefer this method over containing the anchors in a div
        because then when we click on the div, it will take us to the link.
      */}
      <div className="app__footer-cards">
        
        <a href="mailto:patrickducusin2@gmail.com">
          <div className="app__footer-card">
            <img src={images.email} alt="email" />
            <p className="p-text">patrickducusin2@gmail.com</p>
          </div>
        </a>

        <a 
          href="https://www.linkedin.com/in/patrick-ducusin-879b25208/" 
          target="_blank" 
          rel="noreferrer" 
        >
          <div className="app__footer-card">
            <BsLinkedin />
            <p className="p-text">My LinkedIn page</p>
          </div>
        </a>

      </div>

      {
      /*
        The following div is a contact form that will be conditionally
        rendered based on the isFormSubmitted state. If false, then
        a form div will be rendered which contains 3 form fields.

        Each form field is surrounded by a div with a className of "app__flex"
        for styling purposes. We give React control of the form data.

        If the isFormSubmitted state is true, then another div will be
        rendered which contains an h3 element with a message.
      */

        !isFormSubmitted ? 
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input 
              className="p-text" 
              type="text" 
              placeholder="Your name" 
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>

          <div className="app__flex">
            <input 
              className="p-text" 
              type="text" 
              placeholder="Your email" 
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div>
            <textarea
              className="p-text" 
              placeholder="Your message" 
              name="message"
              value={message}
              onChange={handleChange}
            />
          </div>

          <button 
            className="p-text" 
            type="button" 
            onClick={handleSubmit}
          >
            {isLoading ? 'Sending' : 'Send Message'}
          </button>
        </div>
        : 
        <div>
          <h3 className="head-text">Thank you for getting in touch!</h3>
        </div>
      }
    </>
  )
}

// Wrap Footer component with MotionWrap HOC 
// and pass an id parameter of 'contact' into AppWrap
export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__primarybg'
)