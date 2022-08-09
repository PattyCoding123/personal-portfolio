import React from 'react'
import { BsGithub } from 'react-icons/bs'
import { FaLinkedin } from 'react-icons/fa'

const SocialMedia = () => {
  return (
    <div className='app__social'>
      <a href="https://www.linkedin.com/in/patrick-ducusin-879b25208/" target="_blank" rel="noreferrer"> 
        <div>
          <FaLinkedin />
        </div>
      </a>

      <a href="https://github.com/PattyCoding123" target="_blank" rel="noreferrer">
        <div>
          <BsGithub />
        </div>
      </a>
    </div>
  )
}

export default SocialMedia