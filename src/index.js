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
import {Review} from './modules/Review.js'
import {Search, searchCourse} from './modules/Search.js'
import {Stage} from './modules/Stage.js'
import {cleanup, getResourceByUrl, handleChange, handleResponse} from './modules/utilities.js'
import {Videos} from './modules/Videos.js'
import {Grader} from './modules/Grader.js'

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
    this.Grader = Grader.bind(this)
    this.handleChange = handleChange.bind(this)
    this.Header = Header.bind(this)
    this.Help = Help.bind(this)
    this.History = History.bind(this)
    this.logout = logout.bind(this)
    this.Menu = Menu.bind(this)
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
    this.getData()
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
    document.body.className = this.state.user.settings.dark_mode ? 'dark-mode' : ''
    if (this.state.auth) {
      try {
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
                    <Route className='st-link' path='/dashboard'
                    render={() => <this.Grader
                      thumb={this.state.thumb}
                      course={this.state.courses}
                      buckets={{
                      75 : 36, 72 : 35, 71 : 34, 70 : 33, 68 : 32,
                      67 : 31, 66 : 30, 65 : 29, 63 : 28, 62 : 27,
                      60 : 26, 58 : 25, 56 : 24, 53 : 23, 51 : 22,
                      48 : 21, 45 : 20, 43 : 19, 41 : 18, 39 : 17,
                      36 : 16, 32 : 15, 29 : 14, 27 : 13, 25 : 12,
                      23 : 11, 20 : 10, 18 : 9, 15 : 8, 12 : 7,
                      10 : 6, 8 : 5, 6 : 4, 4 : 3, 2 : 2, 0 : 1 }}
                      name={"ACT English Practice 1"}
                      endpoint={"fakeEndpoint"}
                      data={{
                        grading: {
                          '1': {
                            answer: 'a',
                            suggestions: {
                              all: ['the-best-act-prep-course-ever/english/content/diction']}
                          },
                          '2': {
                            answer: 'g',
                            suggestions: {
                              all: ['the-best-act-prep-course-ever/english/content/commas-part-i-rules', 'the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
                            }
                          },
                          '3': {
                            answer: 'a',
                            suggestions: {
                              all: ['the-best-act-prep-course-ever/english/content/diction']
                            }
                          },
                          '4': {
                            answer: 'f',
                            suggestions: {
                              all: ['the-best-act-prep-course-ever/english/content/commas-part-i-rules', 'the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
                            }
                          },
                          '5': {
                            answer: 'c',
                            suggestions: {
                              all: ['the-best-act-prep-course-ever/english/content/verbs-when-to-use-which-tense']
                            }
                          },
                          '6': {
                            answer: 'f',
                            suggestions: {
                              all : ['the-best-act-prep-course-ever/english/content/dashes-colons-semicolons', 'the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
                            }
                          },
                          '7': {
                            answer: 'd',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/diction']
                        		}
                          },
                          '8': {
                            answer: 'g',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/long-transitions']
                        		}
                          },
                          '9': {
                            answer: 'c',
                            suggestions: {
                              all : []
                            }
                          },
                          '10': {
                            answer: 'j',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/long-transitions']
                        		}
                          },
                          '11': {
                            answer: 'c',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/pronouns-part-i']
                        		}
                          },
                          '12': {
                            answer: 'f',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/diction']
                        		}
                          },
                          '13': {
                            answer: 'b',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/main-ideas']
                        		}
                          },
                          '14': {
                            answer: 'j',
                            suggestions: {
                              all : ['the-best-act-prep-course-ever/english/content/verbs-introduction'],
                              a : ['the-best-act-prep-course-ever/english/content/verbs-subject-verb-agreement']
                        		}
                          },
                          '15': {
                            answer: 'b',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/commas-part-i-rules', 'the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
                        		}
                          },
                          '16': {
                            answer: 'g',
                            suggestions: {
                              all : []
                        		}
                          },
                          '17': {
                            answer: 'c',
                            suggestions: {
                              all : ['the-best-act-prep-course-ever/english/content/dashes-colons-semicolons']
                        		}
                          },
                          '18': {
                            answer: 'f',
                            suggestions: {
                              all : ['the-best-act-prep-course-ever/english/content/commas-part-i-rules', 'the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
                        		}
                          },
                          '19': {
                            answer: 'c',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/short-transitions']
                        		}
                          },
                          '20': {
                            answer: 'g',
                            suggestions: {
                        			all : []
                        		}
                          },
                          '21': {
                            answer: 'd',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/long-transitions']
                        		}
                          },
                          '22': {
                            answer: 'g',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/diction']
                        		}
                          },
                          '23': {
                            answer: 'c',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/verbs-when-to-use-which-tense']
                        		}
                          },
                          '24': {
                            answer: 'h',
                            suggestions: {
                              all : ['the-best-act-prep-course-ever/english/content/diction']
                        		}
                          },
                          '25': {
                            answer: 'b',
                            suggestions: {
                              all : ['the-best-act-prep-course-ever/english/content/verbs-when-to-use-which-tense']
                        		}
                          },
                          '26': {
                            answer: 'f',
                            suggestions: {
                              all : ['the-best-act-prep-course-ever/english/content/commas-part-i-rules', 'the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
                        		}
                          },
                          '27': {
                            answer: 'c',
                            suggestions: {
                        			all : []
                        		}
                          },
                          '28': {
                            answer: 'f',
                            suggestions: {
                              all : ['the-best-act-prep-course-ever/english/content/pronouns-part-ii', 'the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
                        		}
                          },
                          '29': {
                            answer: 'd',
                            suggestions: {
                              all : ['the-best-act-prep-course-ever/english/content/commas-part-i-rules', 'the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
                        		}
                          },
                          '30': {
                            answer: 'g',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/placement']
                        		}
                          },
                          '31': {
                            answer: 'c',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/modifiers']
                        		}
                          },
                          '32': {
                            answer: 'j',
                            suggestions: {
                        			all : [],
                              g: ['the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
                        		}
                          },
                          '33': {
                            answer: 'c',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/placement']
                        		}
                          },
                          '34': {
                            answer: 'g',
                            suggestions: {
                              all : ['the-best-act-prep-course-ever/english/content/commas-part-i-rules', 'the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
                        		}
                          },
                          '35': {
                            answer: 'a',
                            suggestions: {
                              all : ['the-best-act-prep-course-ever/english/content/placement']
                        		}
                          },
                          '36': {
                            answer: 'j',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/short-transitions']
                        		}
                          },
                          '37': {
                            answer: 'c',
                            suggestions: {
                              all : ['the-best-act-prep-course-ever/english/content/placement']
                        		}
                          },
                          '38': {
                            answer: 'f',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/modifiers']
                        		}
                          },
                          '39': {
                            answer: 'd',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/parallel-structure']
                        		}
                          },
                          '40': {
                            answer: 'h',
                            suggestions: {
                              all : ['the-best-act-prep-course-ever/english/content/diction']
                        		}
                          },
                          '41': {
                            answer: 'b',
                            suggestions: {
                              all : ['the-best-act-prep-course-ever/english/content/placement']
                        		}
                          },
                          '42': {
                            answer: 'f',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/verbs-when-to-use-which-tense']
                        		}
                          },
                          '43': {
                            answer: 'c',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/placement']
                        		}
                          },
                          '44': {
                            answer: 'g',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/pronouns-part-i']
                        		}
                          },
                          '45': {
                            answer: 'a',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/questions-with-stems']
                        		}
                          },
                          '46': {
                            answer: 'f',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/pronouns-part-i']
                        		}
                          },
                          '47': {
                            answer: 'b',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/verbs-tense-overview']
                        		}
                          },
                          '48': {
                            answer: 'g',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/commas-part-i-rules', 'the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
                        		}
                          },
                          '49': {
                            answer: 'd',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/questions-with-stems']
                        		}
                          },
                          '50': {
                            answer: 'f',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/verbs-subject-verb-agreement']
                        		}
                          },
                          '51': {
                            answer: 'b',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/dashes-colons-semicolons']
                        		}
                          },
                          '52': {
                            answer: 'f',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/long-transitions']
                        		}
                          },
                          '53': {
                            answer: 'd',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/commas-part-i-rules']
                        		}
                          },
                          '54': {
                            answer: 'h',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/verbs-subject-verb-agreement']
                        		}
                          },
                          '55': {
                            answer: 'd',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
                        		}
                          },
                          '56': {
                            answer: 'h',
                            suggestions: {
                              all : ['the-best-act-prep-course-ever/english/content/verbs-subject-verb-agreement']
                        		}
                          },
                          '57': {
                            answer: 'a',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/commas-part-i-rules']
                        		}
                          },
                          '58': {
                            answer: 'g',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/questions-with-stems']
                        		}
                          },
                          '59': {
                            answer: 'c',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/questions-with-stems', 'the-best-act-prep-course-ever/english/content/placement']
                        		}
                          },
                          '60': {
                            answer: 'j',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/questions-with-stems']
                        		}
                          },
                          '61': {
                            answer: 'c',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/verbs-tense-overview']
                        		}
                          },
                          '62': {
                            answer: 'g',
                            suggestions: {
                              all : ['the-best-act-prep-course-ever/english/content/commas-part-i-rules', 'the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
                        		}
                          },
                          '63': {
                            answer: 'd',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/modifiers']
                        		}
                          },
                          '64': {
                            answer: 'j',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/short-transitions']
                        		}
                          },
                          '65': {
                            answer: 'b',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/questions-with-stems']
                        		}
                          },
                          '66': {
                            answer: 'f',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/verbs-approach']
                        		}
                          },
                          '67': {
                            answer: 'b',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/verbs-when-to-use-which-tense']
                        		}
                          },
                          '68': {
                            answer: 'f',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/long-transitions']
                        		}
                          },
                          '69': {
                            answer: 'd',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/long-transitions']
                        		}
                          },
                          '70': {
                            answer: 'f',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/verbs-introduction']
                        		}
                          },
                          '71': {
                            answer: 'c',
                            suggestions: {
                              all : ['the-best-act-prep-course-ever/english/content/questions-with-stems']
                        		}
                          },
                          '72': {
                            answer: 'h',
                            suggestions: {
                              all : ['the-best-act-prep-course-ever/english/content/questions-with-stems']
                        		}
                          },
                          '73': {
                            answer: 'd',
                            suggestions: {
                        			all : ['the-best-act-prep-course-ever/english/content/diction']
                        		}
                          },
                          '74': {
                            answer: 'f',
                            suggestions: {
                              all : ['the-best-act-prep-course-ever/english/content/questions-with-stems']
                        		}
                          },
                          '75': {
                            answer: 'd',
                            suggestions: {
                              all : ['the-best-act-prep-course-ever/english/content/questions-with-stems', 'the-best-act-prep-course-ever/english/content/placement']
                        		}
                          }
                        },
                        analysis : {
                          blank : {
                            threshold : 5,
                            link: 'the-best-act-prep-course-ever/english/tips/pacing-strategies'
                          },
                          score : {
                            threshold: 25,
                            link : 'the-best-act-prep-course-ever/english/tips/general-strategies'
                          }
                        }
                      }
                    }
                    />}
                    />
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
