import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Link, Route, Switch, Redirect} from 'react-router-dom'
import {Icon} from 'react-materialize'
import Loader from './js/Loader.js'
import PropTypes from 'prop-types'

import {getToken, logout, verifyToken} from './modules/authHandlers.js'
import {Bookmarks, getBookmarkId} from './modules/Bookmarks.js'
import {Course, CourseHome, CourseNav, CourseSection} from './modules/Course.js'
import {Dashboard, nestedStateChange} from './modules/Dashboard.js'
import {courseRefresh, createBookmark, deleteBookmark, getData, updateUserObj} from './modules/dataHandlers.js'
import {Downloads} from './modules/Downloads.js'
import {Feedback} from './modules/Feedback.js'
import {Four04} from './modules/Four04.js'
import {Header} from './modules/Header.js'
import {Help} from './modules/Help.js'
import {History} from './modules/History.js'
import {Login} from './modules/Login.js'
import {Menu} from './modules/Menu.js'
import {PracticeTest} from './modules/PracticeTest.js'
import {Review} from './modules/Review.js'
import {Search, searchCourse} from './modules/Search.js'
import {Stage} from './modules/Stage.js'
import {cleanup, getResourceByUrl, handleChange, handleResponse} from './modules/utilities.js'
import {Videos} from './modules/Videos.js'

// Class that controls the state and rendered components of the app
class App extends React.Component {
  constructor(props) {
    super(props)
    this.verifyToken = verifyToken.bind(this)
    this.getData = getData.bind(this)
    this.Login = Login.bind(this)
    this.handleResponse = handleResponse.bind(this)
    this.state = {
      auth : true,
      username: '',
      password: '',
      query: '',
      currentCourse: 'the-best-act-prep-course-ever'
    }
    // Bind all components and bound methods
    this.Bookmarks = Bookmarks.bind(this)
    this.cleanup = cleanup.bind(this)
    this.Course = Course.bind(this)
    this.CourseHome = CourseHome.bind(this)
    this.CourseNav = CourseNav.bind(this)
    this.courseRefresh = courseRefresh.bind(this)
    this.Dashboard = Dashboard.bind(this)
    this.Downloads = Downloads.bind(this)
    this.Feedback = Feedback.bind(this)
    this.nestedStateChange = nestedStateChange.bind(this)
    this.getResourceByUrl = getResourceByUrl.bind(this)
    this.getToken = getToken.bind(this)
    this.handleChange = handleChange.bind(this)
    this.Header = Header.bind(this)
    this.Help = Help.bind(this)
    this.History = History.bind(this)
    this.logout = logout.bind(this)
    this.Menu = Menu.bind(this)
    this.PracticeTest = PracticeTest.bind(this)
    this.Review = Review.bind(this)
    this.Search = Search.bind(this)
    this.searchCourse = searchCourse.bind(this)
    this.CourseSection = CourseSection.bind(this)
    this.Stage = Stage.bind(this)
    this.updateUserObj = updateUserObj.bind(this)
    this.Videos = Videos.bind(this)
    this.getBookmarkId = getBookmarkId.bind(this)
    this.scrollRef = React.createRef()
  }

  componentDidMount() {
    this.verifyToken()
  }

  // Makes sure the correct thumbnails, videos, and downloads are rendered.
  componentDidUpdate(nextProps, nextState) {
    if (this.scrollRef.current) {
      scroll = document.getElementById('video-wrapper')
      if (this.scrollRef.current.offsetTop + this.scrollRef.current.clientHeight > scroll.scrollTop + window.innerHeight) {
        this.scrollRef.current.scrollIntoView()
      }
    }
    const nextRoot = nextProps.location.pathname.split('/').filter(String)[0]
    if (this.state.auth) {
      try {
        document.body.className = this.state.user.settings.dark_mode ? 'dark-mode' : ''
        let nextLink = this.props.location.pathname.split('/').filter(String)
        const newDownloadsLocation = this.getResourceByUrl(nextLink.slice(0, 2).join('/'))
        let nextDirectory = this.getResourceByUrl(nextLink.join('/'))
        let copy = nextLink.slice()
        copy.pop()
        const nextParent = this.getResourceByUrl(copy.join('/'))
        let downloads = []
        if (newDownloadsLocation && 'files' in newDownloadsLocation) {
          downloads = newDownloadsLocation.files
        }
        if (nextDirectory && nextDirectory.collection && nextDirectory.data && nextDirectory.data.type == 'videos' && nextDirectory.collection != nextState.vids) {
          this.setState({vids : nextDirectory.collection, vidLink: '/' + nextLink.join('/')})
        }
        else if (nextParent && nextParent.collection && nextParent.data && nextParent.data.type == 'videos' && (nextParent.collection != nextState.vids || nextDirectory.id != nextState.stage)) {
          this.setState({vids: nextParent.collection, stage: nextDirectory.id, vidLink: '/' + copy.join('/')})
        }
        else if (!nextState.vids && this.state.user.history != null) {
          this.setState({vids: this.state.user.history, vidLink: '/' + nextLink.join('/')})
        }
        if (newDownloadsLocation && newDownloadsLocation.data && newDownloadsLocation.data.type == 'collection' && downloads != nextState.downloads) {
          this.setState({downloads: downloads})
        }
        if (this.state.courses && nextRoot && nextRoot in this.state.courses && nextProps.location.pathname != nextState.lastLink && nextProps.location.pathname) {
          this.setState({lastLink: nextProps.location.pathname})
        }
      }
      catch (error) {
        console.log(error)
        void(0)
      }
    }
  }

  // Calls the Menu and various page components; Menu has the links
  // corresponding to these routes.
  render() {
    if (this.state.courses && this.state.user){
      let courses = []
      for (let course in this.state.courses) {
        courses.push(
          <Route key={course} className='st-link' path={'/' + course} component={this.Course}/>
        )
      }
      let search
      if (this.state.search) {
        search = <this.Search />
      }
      // Prevents 404 page from loading on course-specific routes
      let courseRoutes = []
      for (let course in this.state.courses) {
        courseRoutes.push(
          <Route key={course} className='st-link' path={'/' + course}/>
        )
      }
      return(
          <div>
              <section id="st-app">
                <Route path='/' component={this.Header}/>
                <Route path='/' component={this.Menu}/>
                <section id="st-app-inner">
                  {courses}
                  {search}
                  <Switch>
                    {courseRoutes}
                    <Route className='st-link' path='/dashboard' render={() => <this.PracticeTest name="Official English ACT Practice Test" />}/>
                    {/* <Route className='st-link' path='/dashboard' component={this.Dashboard}/> */}
                    <Route className='st-link' path='/courses' component={this.CourseHome}/>
                    <Route className='st-link' path={'/' + this.state.currentCourse}/>
                    <Route className='st-link' path='/history' component={this.History}/>
                    <Route className='st-link' path='/feedback' component={this.Feedback}/>
                    <Route className='st-link' path='/bookmarks' component={this.Bookmarks}/>
                    <Route className='st-link' path='/review' component={this.Review}/>
                    <Route className='st-link' path='/help' component={this.Help}/>
                    <Route path='/(login|)' exact component={() => <Redirect to='/dashboard'/>}/>
                    <Route path='/all-your-base-are-belong-to-us' component={AllYourBase} />
                    <Route path="/*" exact component={() => <Four04 />}/>
                  </Switch>
                </section>
              </section>
          </div>
        )
      }
      else {
        return(
          <Loader />
        )
      }
    }
  }

const AllYourBase = () => (
  <img style={{height:'100%', width:'100%'}} src="https://upload.wikimedia.org/wikipedia/en/0/03/Aybabtu.png" />
)

// Export the whole thing inside of a router
ReactDOM.render (
  <BrowserRouter>
      <Route path='/' component={App} />
  </BrowserRouter>,
  document.getElementById("app"));
