import ReactDOM from 'react-dom'
import React from "react"
import {TransitionGroup, CSSTransition} from "react-transition-group";
import {BrowserRouter, Switch, Route, Link, Redirect} from "react-router-dom"
import Loader from './js/Loader.js'

import {logout, verifySession} from './modules/authHandlers.js'
import {Bookmarks} from './modules/Bookmarks.js'
import {Course, CourseHome, CourseSection} from './modules/Course.js'
import {Dashboard, nestedStateChange} from './modules/Dashboard.js'
import {addToHistory, courseRefresh, createBookmark, deleteBookmark, replaceInHistory, downloadTracker, getBookmarkId, getData, updateUserObj, submitPracticeTest} from './modules/dataHandlers.js'
import {Downloads} from './modules/Downloads.js'
import {Feedback} from './modules/Feedback.js'
import {Four04} from './modules/Four04.js'
import {Header} from './modules/Header.js'
import {History} from './modules/History.js'
import {Menu} from './modules/Menu.js'
import {Playlists} from './modules/Playlists.js'
import {PracticeTest} from './modules/PracticeTest.js'
import {Review} from './modules/Review.js'
import {Search, searchCourse} from './modules/Search.js'
import {Stage} from './modules/Stage.js'
import {Tests} from './modules/Tests.js'
import {cleanup, getResourceByUrl, handleChange, handleResponse} from './modules/utilities.js'
import {Videos} from './modules/Videos.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.verifySession = verifySession.bind(this)
    this.getData = getData.bind(this)
    this.handleResponse = handleResponse.bind(this)
    this.Menu = Menu.bind(this)
    this.state = {
      username: '',
      password: '',
      query: '',
      missed: '',
      blank: '',
      guessed: ''
    }
    this.addToHistory = addToHistory.bind(this)
    this.Bookmarks = Bookmarks.bind(this)
    this.cleanup = cleanup.bind(this)
    this.Course = Course.bind(this)
    this.CourseHome = CourseHome.bind(this)
    this.courseRefresh = courseRefresh.bind(this)
    this.createBookmark = createBookmark.bind(this)
    this.Dashboard = Dashboard.bind(this)
    this.deleteBookmark = deleteBookmark.bind(this)
    this.replaceInHistory = replaceInHistory.bind(this)
    this.Downloads = Downloads.bind(this)
    this.downloadTracker = downloadTracker.bind(this)
    this.Feedback = Feedback.bind(this)
    this.Four04 = Four04.bind(this)
    this.nestedStateChange = nestedStateChange.bind(this)
    this.getResourceByUrl = getResourceByUrl.bind(this)
    this.handleChange = handleChange.bind(this)
    this.Header = Header.bind(this)
    this.History = History.bind(this)
    this.logout = logout.bind(this)
    this.Menu = Menu.bind(this)
    this.Playlists = Playlists.bind(this)
    this.PracticeTest = PracticeTest.bind(this)
    this.Review = Review.bind(this)
    this.Search = Search.bind(this)
    this.searchCourse = searchCourse.bind(this)
    this.Tests = Tests.bind(this)
    this.CourseSection = CourseSection.bind(this)
    this.Stage = Stage.bind(this)
    this.submitPracticeTest = submitPracticeTest.bind(this)
    this.updateUserObj = updateUserObj.bind(this)
    this.Videos = Videos.bind(this)
  }

  componentDidMount() {
    this.verifySession()
  }

  // Makes sure the correct thumbnails, videos, and downloads are rendered.
  componentDidUpdate(nextProps, nextState) {
    const pathRoot = this.props.location.pathname.split('/').filter(String)[0]
    if (this.state.auth && this.state.user) {
      try {
        scroll = document.getElementById('video-wrapper')
        const scrollRef = document.getElementsByClassName('st-video-card-highlight')[0]
        if (scrollRef) {
          if (scrollRef.offsetTop + scrollRef.clientHeight + 50 > scroll.scrollTop + window.innerHeight) {
            scrollRef.scrollIntoView(false)
        }
          else if (scrollRef.offsetTop + window.innerHeight - 690 < scroll.scrollTop + scrollRef.clientHeight) {
            scrollRef.scrollIntoView()
          }
        }
        document.body.className = this.state.matrixMode ? 'matrix-mode' : this.state.user.settings.dark_mode ? 'dark-mode' : ''
        let nextLink = this.props.location.pathname.split('/').filter(String)
        const newDownloadsLocation = this.getResourceByUrl(nextLink.slice(0, 2).join('/'))
        let nextDirectory = this.getResourceByUrl(nextLink.join('/'))
        let copy = nextLink.slice()
        copy.pop()
        const nextParent = this.getResourceByUrl(copy.join('/'))
        let downloads = (newDownloadsLocation && 'files' in newDownloadsLocation) ? newDownloadsLocation.files : []
        // Hacky, but really cuts down on re-renders and fixes an odd video behavior.
        if (nextProps.location.pathname != window.location.pathname) {
          nextProps.location.pathname = window.location.pathname
        }
        if (nextState.courses && pathRoot && pathRoot in nextState.courses && nextProps.location.pathname != nextState.lastLink && nextProps.location.pathname) {
          this.setState({lastLink: nextProps.location.pathname})
        }
        if (newDownloadsLocation && newDownloadsLocation.data && newDownloadsLocation.data.type == 'collection' && downloads != nextState.downloads) {
          this.setState({downloads: downloads})
        }
      }
      catch (error) {
        void(0)
      }
    }
  }

  render() {
    try {
    if (this.state.courses && this.state.user){
      let courses = []
      for (let course in this.state.courses) {
        courses.push(
            [<Route key={course + 'tests'} path={'/' + course + '/tests'} component={this.Tests} />,
            <Route key={course + 'playlists'} path={'/' + course + '/playlists'} component={this.Playlists} />,
            <Route key={course} className='st-link' path={'/' + course} location={this.props.location} component={this.Course}/>]
        )
      }
      let search
      if (this.state.search) {
        search = <this.Search />
      }
      return (
        <section id="st-app">
          <Route path='/' component={this.Header}/>
          <Route path='/' component={this.Menu}/>
          {this.state.matrixMode && <MatrixBackground />}
          <section id="st-app-inner">
            <div className={this.state.search ? 'basket' : 'basket-hide'}>
              {search}
            </div>
            <Route
              render={({ location }) => (
                <div>
                  <Route
                    exact
                    path="/"
                    render={() => <Redirect to="/dashboard" />}
                  />
                  <div>
                    <TransitionGroup>
                      <CSSTransition key={location.key}
                        classNames="fade"
                        timeout={500}>
                        <div>
                          <Switch location={location}>
                            {courses}
                            <Route path='/dashboard' component={this.Dashboard} />
                            <Route path='/courses' component={this.CourseHome} />
                            <Route path={'/' + this.state.currentCourse} />
                            <Route path='/history' component={this.History} />
                            <Route path='/feedback' component={this.Feedback} />
                            <Route path='/bookmarks' component={this.Bookmarks} />
                            <Route path='/review' component={this.Review} />
                            <Route path='/all-your-base-are-belong-to-us' component={AllYourBase} />
                            <Route path="/*" component={this.Four04} />
                          </Switch>
                        </div>
                      </CSSTransition>
                    </TransitionGroup>
                  </div>
                </div>
              )}/>
            </section>
          </section>
      )
    }
    else {
      return(
        <Loader />
      )
    }
  }
  catch (e){console.log(e)}
  }
}

const AllYourBase = () => (
  <img style={{width:'75%'}} src="https://upload.wikimedia.org/wikipedia/en/0/03/Aybabtu.png" />
)

const MatrixBackground = () => (
    <iframe src="./background.html" className='matrix-background'>
    </iframe>
)

// Export the whole thing inside of a router
ReactDOM.render(
  <BrowserRouter>
    <Route path='/' component={App} />
  </BrowserRouter>,
  document.getElementById("app"))
