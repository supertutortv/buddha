import React from 'react'
import {Link, Route} from 'react-router-dom'
import {BrowserRouter} from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group";

// Course Home Page
function CourseHome(props) {
  let courses = []
  for (let course in this.state.courses) {
    courses.push(
      <div key={course}>
        <Link className='st-link' to={'/' + course}>{this.cleanup(course)}</Link>
        <div style={{fontSize: '80%', fontStyle: 'italic', display: 'inline-block', paddingLeft: '10px'}}>
          (Version {this.state.courses[course].data.version})
        </div>
      </div>
    )
  }
  return(
    <div className="st-courses">
      <h4>Your Courses:</h4>
      {courses}
    </div>
  )
}

// Wrapper for the stage and the right sidebar
function Course(props) {
  // console.log(props.location)
  let link = '/' + this.state.currentCourse
  return(
    <div id="st-course">
      <div id="st-nav">
        <this.CourseNav />
      </div>
      <div id="st-stage">
        <this.Stage location={props.location.pathname}/>
      </div>
      <div id="video-wrapper">
        <BrowserRouter>
          <this.Videos vids={this.state.vids} link={this.state.vidLink} />
        </BrowserRouter>
      </div>
    </div>
  )
}

// The Course tree navigation popup
function CourseNav(props) {
  let course = this.state.courses[this.state.currentCourse]
  let link = '/' + this.state.currentCourse
  return(
    <div id="st-sections">
      <this.CourseSection collection={course.collection} link={link} thumb={course.data.thumbUrls.plain} spacing={0} />
  </div>
  )
}


// Component that recursively generates the routes and links for collections
// until it gets to a video folder
function CourseSection(props) {
  const collection = props.collection
  const topLink = props.link
  const thumb = props.thumb
  const spacing = props.spacing
  let renderedSections = []
  for (let section in collection) {
    let currentSection = collection[section]
    const name = currentSection.data.name
    let link = topLink + '/' + section
    let route
    let click
    if (currentSection.data.type == 'collection') {
      let nextCollection = currentSection.collection
      let nextSpacing = spacing + 1
      route = <Route path={link} render={() => <this.CourseSection
        collection={nextCollection} link={link} thumb={thumb}
        spacing={nextSpacing} />} />
      if ('intro' in currentSection.data) {
        click = () => {this.setState({stage: currentSection.data.intro, lastLink: link})}
      }
    }
    else {
      let vids = currentSection.collection
      click = () => this.setState({vids: vids, vidLink : link, vidThumbLink: thumb, lastLink: link})
    }
    renderedSections.push(
      <div key={section} style={{paddingLeft: 10*spacing}} >
        <Link to={link} onClick={click} className={window.location.pathname == link ? 'link-highlight' : 'link'}> {name} </Link>
        {route}
      </div>
    )
  }
  return (renderedSections)
}

export {Course, CourseHome, CourseNav, CourseSection}
