import React from 'react'
import {Link, Route} from 'react-router-dom'
import {BrowserRouter} from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group";

// Course Home Page. Contains a list of courses the user can access.
function CourseHome(props) {
  let courses = []
  for (let course in this.state.courses) {
    const label = typeof this.state.courses[course] == 'object' && 'data' in this.state.courses[course] ? 'Version ' + this.state.courses[course].data.version  : 'Expired'
    courses.push(
      <div key={course}>
        <Link className='st-link' to={'/' + course} onClick={() => this.setState({currentCourse: course})}>{this.cleanup(course)}</Link>
        <div style={{fontSize: '80%', fontStyle: 'italic', display: 'inline-block', paddingLeft: '10px'}}>
          ({label})
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

// Wrapper for the nav, stage, and the right sidebar
function Course(props) {
  // The extra router is in here to prevent full page re-renders when videos are clicked.
  // It also necessitates that funky "hack" in componentDidUpdate (marked)
  let link = '/' + this.state.currentCourse
  let course = this.state.courses[this.state.currentCourse]
  if (course instanceof Array) {
      return (
        <h5>
          It looks like your subscription to this course has expired! You can
          renew your subscription, or go to the help page if you think this is an error.
        </h5>
      )
  }
  else {
    if (this.getResourceByUrl(props.location.pathname) !== null) {
      return(
        <div id="st-course">
          <div id="st-nav">
            <div id="st-sections">
              <this.CourseSection collection={course.collection} link={link} thumb={course.data.thumbUrls.plain} spacing={0} />
            </div>
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
    else {
      return <this.Four04 />
    }
  }
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

export {Course, CourseHome, CourseSection}
