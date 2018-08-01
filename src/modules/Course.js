import React from 'react'
import {Link, Route} from 'react-router-dom'
import {BrowserRouter} from "react-router-dom"
import {Row, Col} from 'react-materialize'

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
      return(
        <h5>
          It looks like your subscription to this course has expired! You can
          renew your subscription, or go to the help page if you think this is an error.
        </h5>
      )
  }
  else {
    const directory = this.getResourceByUrl(props.location.pathname)
    let parentUrl = props.location.pathname.split('/').filter(String)
    parentUrl.splice(-1, 1)
    parentUrl = '/' + parentUrl.join('/')
    if (directory !== null) {
      if (directory.data && directory.data.type && directory.data.type == 'collection' || directory.data && !directory.data.type) {
        return(
          <div>
            <div className="stage-center">
              <this.Stage location={props.location.pathname}/>
            </div>
            <div id="st-nav">
              <this.CourseSection location={props.location.pathname} />
            </div>
          </div>
        )
      }
      else {
        let parentUrl = props.location.pathname.split('/').filter(String)
        parentUrl.splice(-1, 1)
        parentUrl = '/' + parentUrl.join('/')
        const vids = directory.collection ? directory.collection : this.getResourceByUrl(parentUrl).collection
        const link = directory.collection ? props.location.pathname : parentUrl
        return(
          <div id="st-course" >
              <this.Stage location={props.location.pathname}/>
            <div id="video-wrapper" >
              <BrowserRouter>
                <this.Videos vids={vids} link={link} />
              </BrowserRouter>
            </div>
          </div>
        )
      }
    }
    else {
      return <this.Four04 />
    }
  }
}

// Component that recursively generates the routes and links for collections
// until it gets to a video folder
function CourseSection(props) {
  let renderedSections = []
  const parent = this.getResourceByUrl(props.location)
  const dir = parent.collection
  for (let section in dir) {
    let subSection = dir[section]
    const name = subSection.data.name
    const link = props.location + '/' + section
    renderedSections.push(
      <Col s={12} m={12} l={6} key={section} style={{paddingBottom: '20px'}}>
        <Link to={link}>
          <div className="st-subsection">
            <h3>
              {name}
            </h3>
            <br />
            {!!subSection.data.description && subSection.data.description}
          </div>
        </Link>
      </Col>
    )
  }
  return(
    <Row>
      {renderedSections}
    </Row>
  )
}

export {Course, CourseHome, CourseSection}
