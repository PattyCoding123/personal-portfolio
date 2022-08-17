import { React , useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AiFillEye, AiFillGithub } from 'react-icons/ai'

import { AppWrap, MotionWrap } from '../../wrapper'
import { urlFor, client } from '../../client'
import './Projects.scss'

const Projects = () => {
  /*
    The first state we will be utilizing is the "activeFilter"
    state which will determine what portfolio projects will
    be displayed to the page.

    The second state is "animateCard" which will determine
    how the motion.div will animate on the webpage.

    The third state is the Projects data which will populate
    the portfolio section.

    The fourth state is filterProject which will handle what Project
    will be rendered to the main page.
  */
  const [activeFilter, setActiveFilter] = useState('All')
  const [animateCard, setAnimateCard] = useState({y: 0, opacity: 1})
  const [projects, setProjects] = useState([])
  const [filterProject, setFilterProject] = useState([])

  /*  
    The following useEffect will pull data from the Project's schema
    in our Sanity client which we will use to populate the motion.div
    component and all the Project-portfolio items. Since we only want the
    useEffect to run once, we will use an empty array in the dependencies 
    array.
  */
  useEffect(() => {
    const query = '*[_type == "projects"]'

    async function getProjects() {
      const data = await client.fetch(query)
      setProjects(data) // Set Projects state to whatever we fetched from Sanity.
      setFilterProject(data) //
    }
    getProjects()
    
  }, [])
  
  // When a filter tab is clicked, the handleProjectFilter function
  // will be invoked.
  const handleProjectFilter = (tag) => {
    // Set activeFilter state to whatever filter item was clicked.
    setActiveFilter(tag);

    // Retrigger shuffle animation of the cards when a new filter
    // is picked. This will cause the cards to disappear in the air.
    setAnimateCard([{y: 100, opacity: 0}]);
    
    
    setTimeout(() => {
      // Reset animation to appearing into view while becoming fully
      // visible.
      setAnimateCard([{y: 0, opacity: 1}]);

      // If the user chooses the "All" tag, then set the
      // filterProject state to be just all the Projects.
      if(tag === 'All') {
        setFilterProject(projects);
      } else {
        /*
          If the tag is specific, then call the filter method
          on the Projects array and set it to the filterProject state.
          A Project item passes so long as it contains the active
          filter in its tag array.
        */

        setFilterProject(projects.filter((project) => project.tags.includes(tag)))
      }
    }, 500)
  }

  return (
    <>
      <h2 className="head-text">My <span> Projects </span> Section </h2>
      {/* 
        The following array will map each Project filter into its own div component
        that has a key, an event listener to change the filter on the portfolio
        projects section, and a special className that will change 
        depending on the state of activeFilter.
      */}
      <div className="app__project-filter">
        {['UI/UX', 'Web App', 'Mobile App', 'All'].map((tag, index) => (
          <div
            key={index}
            onClick={() => handleProjectFilter(tag)}
            className={`app__project-filter-item app__flex p-text ${activeFilter === tag ? 'item-active' : ''}`}
          >
            {tag}
          </div>
        ))}
      </div>

      {/* 
        The following motion.div will animate the entire section
        containing the Project items onto the web page.

        The animate attribute will be handled by the state, and
        by the transition attribute, the div will take 0.5 seconds
        to animate with the children motion elements
        animating 0.5 seconds after.
      */}
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5}}
        className="app__project-portfolio"
      >
        {/*
          The following array is a State that we will use to assign all
          the Project items from Sanity into visible components on the webpage.
          Each Project item will have a animated images, website/github links,
          and a title/description.

          Aka, each div of app__project-item is a single Project item.

          Only the Projects inside the filterProject array will be
          rendered to the page.
        */}
        {filterProject.map((project, index) => (
          <div className="app__project-item app__flex" key={index}>
            <div className="app__project-img app__flex">
              <img src={urlFor(project.imgUrl)} alt={project.name}/>

              {/* 
                The following motion.div will animate the link icons of the Projects.
                of the Project items. While hovered, the div will increase
                in opacity. For the transition, it will take the animation
                0.25 seconds with each child element being animate 0.5 seconds
                after one another.
              */}
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5}}
                className="app__project-hover app__flex"
              >
                {/*
                  Having target="_blank" will cause the link to open
                  in another browser.
                */}
                
                {/* 
                  The following anchor tag will be conditionally rendered if
                  there is a project link. The motion.div animates the anchor tag icon.
                  While hovered, the icon will become smaller. While in view,
                    hey will increase in size.
                */}
                {project.projectLink && <a href={project.projectLink} target="_blank" rel="noreferrer noopener">
                  <motion.div
                    whileInView={{scale: [0, 1]}}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>}

                {/* 
                  The following anchor tag will be conditionally rendered if
                  there is a github/code link. The motion.div animates the anchor tag icon.
                  While hovered, the icon will become smaller. While in view,
                    hey will increase in size.
                */}
                {project.codeLink && <a href={project.codeLink} target="_blank" rel="noreferrer noopener">
                  {/* 
                    The following motion.div will animate the anchor tag icon.
                    While hovered, the icon will become smaller. While in view,
                    they will increase in size.
                  */}
                  <motion.div
                    whileInView={{scale: [0, 1]}}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>}
              </motion.div>
            </div>

            {/*
              The following code handles how to display each Projects title
              and description onto the page. Each Project item object
              will have a title and description that we can render to the page,
              as well as a tag that will tell the user what category it belongs to.
            */}
            <div className="app__project-content app__flex">
                <h4 className="bold-text">{project.title}</h4>
                <p className="p-text" style={{ marginTop: 10 }}>{project.description}</p>

                <div className="app__project-tag app__flex">
                  <p className="p-text">{project.tags[0]}</p>
                </div>
            </div>

          </div>
        ))}
      </motion.div>
    </>
  )

}

// Wrap Projects component with MotionWrap HOC 
// and pass an id parameter of 'projects' into AppWrap
export default AppWrap(
  MotionWrap(Projects, 'app__projects'),
  'projects',
  'app__primarybg')