import { React, useState, useEffect, Fragment } from 'react'
import { motion } from 'framer-motion'
import ReactToolTip from 'react-tooltip'

import { AppWrap, MotionWrap } from '../../wrapper'
import { urlFor, client } from '../../client'
import './Skills.scss'

const Skills = () => {
  /*
    The first state we will utilize is the skills state which
    is the data containing all the skills we currently have.

    The second state is the experiences state which is the
    data containing past work experiences. Experiences contains
    a field called "works" which is an array meant to house
    more arrays called "years"

    Each year will have an array of job-related experiences.
  */
  const [skills, setSkills] = useState([])
  const [experiences, setExperiences] = useState([])

  /*  
    The following useEffect will pull data from the Skills schema and
    Experiences schema in our Sanity client which we will use to 
    populate the motion.div component and all the related items.
    Since we only want the useEffect to run once, we will use an empty
    array in the dependencies array.
  */
    useEffect(() => {
      const skillsQuery = '*[_type == "skills"]'
      const experiencesQuery = '*[_type == "experiences"]'
  
      async function getSkillsAndExp() {
        const skillsData = await client.fetch(skillsQuery)
        const expData = await client.fetch(experiencesQuery)

        /*
          Since the array returned by Sanity does not sort each
          experience by year (it sorts by date created), we need 
          to call the sort method on the experiences data and
          and make sure to compare the years. 1 means object b
          takes precendent over object a when sorting.
        */
        expData.sort((a, b) => (a.year < b.year ? 1 : -1))

        setSkills(skillsData) // Set skills state to what we fetched from Sanity.
        setExperiences(expData) // Set experiences state to the sorted expData array. 
      }
      getSkillsAndExp()
      
    }, [])

  return (
    <>
      <h2 className="head-text"> <span>Skills</span> and <span>Experiences</span></h2>

      {/* 
        The following div is the container for the Skills
        list and the Experience list. 
      */}
      <div className="app__skills-container">
        {/* 
          The following motion.div will contain all the skills
          which will be held in their own motion.divs 
        */}
        <motion.div className="app__skills-list">

          {/* 
            Each skill motion.div item will have an individual
            div that is styled based on the skill's selected background
            color, an image for the skill, and the name. 

            For the animation, whileInView will cause the div to 
            become visible over the course of 0.5 seconds.
          */}
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div className="app__flex" style={{ backgroundColor: skill.bgColor }}>
                <img src={urlFor(skill.icon)} alt={skill.name}/>
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 
          The following div will contain all the 
          work experiences.
        */}
        <div className="app__skills-exp">
          {/* 
            Each experience will be contained in a motion.div element
            since we need to separate each experience by the year
            they were placed under. 
            
            The way we set up our schema makes it such that when we get
            the experiences data, it will be an array of objects where
            each object represents the year.
            
            Thus, we need a nested loop since each year will 
            have multiple experiences being mapped to them.
          */}
          {experiences.map((experience) => (
            <motion.div
              className="app__skills-exp-item"
              key={experience.year}
            >
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>

              {/* Each year's experience will be held in this motion.div */}
              <motion.div className="app__skills-exp-works">

                {/*
                  For each work experience item, there will be a motion.div
                  element that contains the name of the job position and the
                  company, and there will also be a tooltip element which
                  contains the description of that work experience.
                */}
                {experience.works.map((work, index) => (
                  // Explicitly define a fragment to give key property
                  <Fragment key={index}>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={work.name}
                      key={work.name}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
      
                  
                    <ReactToolTip
                      id={work.name}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      {work.desc}
                    </ReactToolTip>
                  </Fragment>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}

// Wrap Skills component with MotionWrap HOC 
// and pass an id parameter of 'skills' into AppWrap
export default AppWrap(
  MotionWrap(Skills, 'app__skills'), 
  'skills',
  'app__whitebg')