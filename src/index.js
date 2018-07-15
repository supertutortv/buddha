import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch, Redirect} from 'react-router-dom'
import {Icon} from 'react-materialize'
import loader from './js/Loader.js'
import PropTypes from 'prop-types'

// Replaces slashes with '>'s, capitalizes words, removes dashes, and makes ii's into II's. Keeps 'vs' lowercase.
const cleanup = (string) => (
  string.replace(/\//g,' > ').replace(/\b\w/g,(x)=>(x.toUpperCase())).replace(/-/g, ' ').replace(/i(?=(i|\b))/g, 'I').replace('Vs', 'vs')
)

// Basic component for unmatched routes
const Four04 = () => (
  <h3>
    We couldn't find that page!
  </h3>
)

// Class that controls the state and rendered components of the app
class App extends React.Component {
  constructor(props) {
    super(props)
    this.verifyToken = this.verifyToken.bind(this)
    this.getData = this.getData.bind(this)
    this.Login = this.Login.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
    this.state = {
      auth : false,
      username: '',
      password: ''
    }
    // Bind all components and bound methods
    this.Bookmarks = this.Bookmarks.bind(this)
    this.Course = this.Course.bind(this)
    this.CourseNav = this.CourseNav.bind(this)
    this.courseRefresh = this.courseRefresh.bind(this)
    this.Dashboard = this.Dashboard.bind(this)
    this.Downloads = this.Downloads.bind(this)
    this.Feedback = this.Feedback.bind(this)
    this.genericHandler = this.genericHandler.bind(this)
    this.getResourceByUrl = this.getResourceByUrl.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.Header = this.Header.bind(this)
    this.Help = this.Help.bind(this)
    this.History = this.History.bind(this)
    this.logout = this.logout.bind(this)
    this.Menu = this.Menu.bind(this)
    this.Review = this.Review.bind(this)
    this.Search = this.Search.bind(this)
    this.searchCourse = this.searchCourse.bind(this)
    this.Section = this.Section.bind(this)
    this.Stage = this.Stage.bind(this)
    this.updateStage = this.updateStage.bind(this)
    this.updateUserObj = this.updateUserObj.bind(this)
    this.Videos = this.Videos.bind(this)
    this.getBookmarkId = this.getBookmarkId.bind(this)
  }

  componentDidMount() {
    this.verifyToken()
  }

  // Makes sure the correct thumbnails, videos, and downloads are rendered.
  componentDidUpdate(nextProps, nextState) {
    const errorMessage = 'There was an error with your course data. You may wish to try refreshing from the menu.'
    if (this.state.auth) {
      try {
        let nextParent = this.props.location.pathname.split('/').filter(String)
        const newDownloads = this.getResourceByUrl(nextParent.slice(0, 2).join('/'))
        nextParent.pop()
        const newDir = this.getResourceByUrl(nextParent.join('/'))
        let downloads = []
        if (newDownloads && 'files' in newDownloads) {
          downloads = newDownloads.files
        }
        if (newDir && newDir.collection && newDir.data && newDir.data.type == 'videos' && newDir.collection != nextState.vids) {
          this.setState({vids : newDir.collection, vidLink: '/' + nextParent.join('/'), message: ''})
        }
        if (newDownloads && newDownloads.data && newDownloads.data.type == 'collection' && downloads != nextState.downloads) {
          this.setState({downloads: downloads, message: ''})
        }
        if (this.state.stage == null && newDownloads && newDownloads.data) {
          this.setState({stage: newDownloads.data.intro})
        }
        else if (!this.state.vids && this.state.user.history != null) {
          this.setState({vids: this.state.user.history, thumb: thumb})
        }
      }
      catch (error) {
        if (this.state.message != errorMessage) {
          this.setState({message: errorMessage})
        }
      }
    }
  }

  // Handles changes to the user object's state, used in the Dashboard
  genericHandler ( path, {target} ) {
    // Recursive function that for updating nested objects
    const helper = function(path, obj, {target}) {
      if (path.length > 0) {
        let key = path.shift()
        obj[key] = helper(path, obj[key], {target})
      }
      else {
        if (target.type == 'checkbox') {
          obj[target.name] = target.checked
        }
        else {
          obj[target.name] = target.value
        }
      }
      return obj
    }
    this.setState({user : helper(path, this.state.user, {target})})
  }

  // Updates the remote user object and then uses the response from the server
  // to update the state and the localStorage object
  updateUserObj (key) {
    const setting = this.state.key
    fetch('https://api.supertutortv.com/v2/courses/data/' + key, {
      method : 'PUT',
      accept: 'application/vnd.sttv.app+json',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.user[key])
    })
    .then(response => this.handleResponse(response))
    .then( items => {
      if (items !== null) {
        const user_obj = this.state.user
        user_obj[key] = items.data[key]
        this.setState({user : user_obj})
        const courseData = JSON.parse(localStorage.getItem('sttv_data'))
        courseData.user = this.state.user
        localStorage.setItem('sttv_data', JSON.stringify(courseData))
      }
    })
    .catch(error => {
      this.setState({
        message : 'There was an error upadating your settings. Please contact STTV support if the problem persists.'
      })
    })
  }

  // Header that goes at the top of the app; contains routes to display the page title
  Header(props) {
    const base = props.location.pathname.split('/').filter(String)
    return(
      <header>
          <div id="st-header-inner">
            <div id="st-header-branding">
              <img src="https://supertutortv.com/wp-content/uploads/2016/10/sttv_site_logo.png" alt="SupertutorTV"/>
            </div>
            <div id="st-header-view-title">
              <Switch>
                <Route className='st-link' path={'/' + this.state.currentCourse} component={() => (cleanup(this.state.currentCourse))}/>
                <Route className='st-link' path='/dashboard' component={() => "Dashboard"}/>
                <Route className='st-link' path='/history' component={() => "History"}/>
                <Route className='st-link' path='/feedback' component={() => "Feedback"}/>
                <Route className='st-link' path='/bookmarks' component={() => "Bookmarks"}/>
                <Route className='st-link' path='/review' component={() => "Review"}/>
                <Route className='st-link' path='/help' component={() => "Help"}/>
                <Route className='st-link' path='/all-your-base-are-belong-to-us' component={() => "You have no chance to survive make your time"} />
                <Route path="/*" exact component={() => "Oops"}/>
              </Switch>
            </div>
          </div>
      </header>
    )
  }

  // Dashboard component. Could use a little styling.
  Dashboard(props) {
    let courses = []
    for (let course in this.state.courses) {
      courses.push(
        <div key={course}>
          {cleanup(course)}
          <input type='checkbox' name='currentCourse' value={course} disabled={this.state.currentCourse===course}
            checked={this.state.currentCourse === course}
            onClick={this.settingsHandler}></input>
        </div>
      )
    }
    return(
      <div>
        <h3>Welcome to the Dashboard, {this.state.user.userdata.firstname}</h3>
        <div>
          <h2>Settings:</h2>
          <div>
            Your courses
            {courses}
          </div>
          <br/>
          <div>
            Dark Mode
            <input type="checkbox" label="Dark Mode" name="dark_mode" checked={this.state.user.settings.dark_mode}
              onChange={(event) => this.genericHandler(['settings'], event)}>
            </input>
          </div>
          <br/>
          <div>
            Autoplay
            <input type="checkbox" label="Autoplay" name="autoplay" checked={this.state.user.settings.autoplay}
              onChange={(event) => this.genericHandler(['settings'], event)}>
            </input>
          </div>
          <br/>
          <a onClick={() => this.updateUserObj('settings')}><strong>Update Settings </strong><Icon>cloud_upload</Icon></a>
          <div>
            <h2>Your Information:</h2>
            <small>(click to edit)</small>
            <div>
              First Name
              <input type="text" autoComplete="off" className="info-input" name="firstname" value={this.state.user.userdata.firstname} onChange={(event) => this.genericHandler(["userdata"], event)}/>
            </div>
            <div>
              Last Name
              <input type="text" autoComplete="off" className="info-input" name="lastname" value={this.state.user.userdata.lastname} onChange={(event) => this.genericHandler(["userdata"], event)} />
            </div>
            <div>
              <br/>
              Line 1 <input type="text" autoComplete="off" className="info-input" name="line1" value={this.state.user.userdata.address.line1} onChange={(event) => this.genericHandler(["userdata", "address"], event)} />
              <br/>
              Line 2 <input type="text" autoComplete="off" className="info-input" name="line2" value={this.state.user.userdata.address.line2} onChange={(event) => this.genericHandler(["userdata", "address"], event)} />
              <br/>
              City <input type="text" autoComplete="off" className="info-input" name="city" value={this.state.user.userdata.address.city} onChange={(event) => this.genericHandler(["userdata", "address"], event)} />
              <br/>
              State <input type="text" autoComplete="off" className="info-input" name="state" value={this.state.user.userdata.address.state} onChange={(event) => this.genericHandler(["userdata", "address"], event)} />
              <br/>
              Zip <input type="text" autoComplete="off" className="info-input" name="zip" value={this.state.user.userdata.address.zip} onChange={(event) => this.genericHandler(["userdata", "address"], event)} />
            </div>
            <br/>
            <a type="button" onClick={() => this.updateUserObj('userdata')}><strong>Update Information </strong><Icon>cloud_upload</Icon></a>
          </div>
          <div>
            <h2>Your Orders:</h2>
            {this.state.user.userdata.orders}
          </div>
        </div>
      </div>
    )
  }

  // History component. Contains a grid of videos which is currently static
  History(props) {
    let vids = []
    let index = 0
    const history = this.state.user.history
    const thumbURL = this.state.thumb
    for (let item in history) {
      let url = history[item].data.url
      let vid = this.getResourceByUrl(url)
      let thumb = thumbURL.replace('||ID||', vid.thumb)
      let click
      if (vid.id) {
        click = () => this.updateStage(String(vid.id))
      }
      vids.push(
        <div key={index} className="video-in-grid">
          <Link to={url} onClick={click}>
            <div >
              <div>
                  <img className="grid-thumb" src={thumb} className="z-depth-3"/>
              </div>
              <span className="video-grid-title"> {cleanup(url.slice(1))} </span>
            </div>
          </Link>
        </div>
      )
      index++
    }
    return(
      <div className="video-grid">
        {vids}
      </div>
    )
  }

  getBookmarkId(url){
    for (let index in this.state.user.bookmarks) {
      let bookmark = this.state.user.bookmarks[index]
      if (bookmark.data.url == url) {
        return bookmark.id
      }
    }
    return null
  }

  // Deletes a bookmark from the remote object; uses the server's response to
  // delete the bookmark from the state and the localStorage object
  deleteBookmark(id) {
    fetch('https://api.supertutortv.com/v2/courses/data', {
    method: 'DELETE',
    accept: 'application/vnd.sttv.app+json',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: id
      })
    })
    .then( response => this.handleResponse(response))
    .then( items => {
      if (items !== null) {
        let user = this.state.user
        for (let item in user.bookmarks) {
          if (user.bookmarks[item].id == items.data[0].id) {
            user.bookmarks.splice(item, 1)
          }
        }
        const course_data = JSON.parse(localStorage.getItem('sttv_data'))
        course_data.user = user
        localStorage.setItem('sttv_data', JSON.stringify(course_data))
        const bookmarkedIds = user.bookmarks.map(a => a.data.url)
        this.setState({user: user, bookmarkedIds: bookmarkedIds})
      }
      else {
        this.setState({message: 'Could not remove that bookmark. Please try again later.'})
      }
    })
    .catch(error => {
      this.getData()
    })
  }

  // Bookmarks component. Contains a grid of videos which can be removed from
  // the local and remote objects by deleteBookmark
  Bookmarks(props) {
    let bookmarks = []
    const thumbURL = this.state.thumb
    for (let item in this.state.user.bookmarks) {
      try {
        let mark = this.state.user.bookmarks[item]
        let url = this.state.user.bookmarks[item].data.url
        let vid = this.getResourceByUrl(url)
        let id
        let thumb
        if (vid && vid.data && vid.data.type == 'collection') {
          id = vid.data.intro
          thumb = id
        }
        else {
          id = vid.id
          thumb = vid.thumb
        }
        thumb = thumbURL.replace('||ID||', thumb)
        vid = this.getResourceByUrl(url)
        const titleBase = url.slice(1).split('/')
        let title
        if (vid.name) {
          titleBase.pop()
          title = cleanup(titleBase.join('/')) + ' > ' + vid.name
        }
        else {
          title = cleanup(titleBase.join('/'))
        }
        let click
        if (vid.id) {
          click = () => this.updateStage(String(vid.id))
        }
        bookmarks.push(
          <div key={mark.id} className="video-in-grid">
            <a className="st-video-remover" onClick={() => this.deleteBookmark(mark.id)} ><Icon>highlight_off</Icon></a>
            <Link to={url} onClick={click}>
              <div >
                <div>
                    <img className="grid-thumb" src={thumb} className="z-depth-3"/>
                </div>
                <span className="video-grid-title"> {title} </span>
              </div>
            </Link>
          </div>
        )
      }
      catch (e) {
        void(0)
      }
    }
    return(
      <div className="video-grid">
        {bookmarks.reverse()}
      </div>
    )
  }

  // The name says it all here. Used throughout the app for accessing data from
  // the course object without passing resources around
  getResourceByUrl(url) {
    try {
      const lookup = url.split('/').filter(String)
      let obj = this.state.courses
      while (true) {
        if (lookup[0] == null) {
          return(obj)
        }
        else if ('collection' in obj) {
          obj = obj.collection
        }
        else if (lookup[0] in obj) {
          obj = obj[lookup.shift()]
        }
        else {
          return(obj)
        }
      }
    }
    catch (e) {
      return null
    }
  }

  // Feedback component; needs styling and backend support
  Feedback(props) {
    return(
      <div id="course-feedback">
        <h2 className="header center-align">Feedback</h2>
        <div className="col s12 center-align">
          <p>
            Drop us a line if you catch any mistakes, have any suggestions,
            or would just like to let us know how we're helping you get a
            better score! If you'd like to rate us so future students can see what
            you think of the course, you can do that <Link to='/review' style={{text: 'bold'}} >here</Link>.
            (By the way, this is just between us... no one else will see
            your feedback but the fine folks here at SupertutorTV.)
         </p>
       </div>
      <div className="col s12" id="feedback-post-form">
        <div className="overlay"></div>
        <textarea placeholder="Enter your feedback here." className="sttv-textarea"  name="feedback" value={this.state.feedback} onChange={this.handleChange}>
        </textarea>
        <div className="feedback-submit-container center-align">
          <a className="feedback-submit-button btn" onClick={() => console.log('This will submit feedback')}>
            <strong>Submit Feedback</strong>
          </a>
        </div>
      </div>
    </div>
    )
  }

  // Review component; also needs styling and backend support
  Review(props) {
    return(
      <div id="ratings-modal-wrapper" onClick={() => this.setState({ratingLock: 0, rating: 0})}>
      	<div className="header center-align">
      		<h2>Rate this course</h2>
      	  <p>Rate us and leave a review so<b> others </b>
          can see how this course has helped you!</p>
      	</div>
      	<section className="rating-widget">
      	  <div className="rating-stars center-align">
      			<a className={this.state.ratingLock > 0 ? 'star-active-lock' : this.state.rating > 0 ? 'star-active' : 'star'} onMouseOver={() => this.setState({rating:1})} onMouseOut={() => this.setState({rating:0})}
              onClick={(e) => {this.setState({ratingLock:1}); e.stopPropagation()}}><Icon>star</Icon></a>
            <a className={this.state.ratingLock > 1 ? 'star-active-lock' : this.state.rating > 1 ? 'star-active' : 'star'} onMouseOver={() => this.setState({rating:2})} onMouseOut={() => this.setState({rating:0})}
              onClick={(e) => {this.setState({ratingLock:2}); e.stopPropagation()}}><Icon>star</Icon></a>
            <a className={this.state.ratingLock > 2 ? 'star-active-lock' : this.state.rating > 2 ? 'star-active' : 'star'} onMouseOver={() => this.setState({rating:3})} onMouseOut={() => this.setState({rating:0})}
              onClick={(e) => {this.setState({ratingLock:3}); e.stopPropagation()}}><Icon>star</Icon></a>
            <a className={this.state.ratingLock > 3 ? 'star-active-lock' : this.state.rating > 3 ? 'star-active' : 'star'} onMouseOver={() => this.setState({rating:4})} onMouseOut={() => this.setState({rating:0})}
              onClick={(e) => {this.setState({ratingLock:4}); e.stopPropagation()}}><Icon>star</Icon></a>
            <a className={this.state.ratingLock > 4 ? 'star-active-lock' : this.state.rating > 4 ? 'star-active' : 'star'} onMouseOver={() => this.setState({rating:5})} onMouseOut={() => this.setState({rating:0})}
              onClick={(e) => {this.setState({ratingLock:5}); e.stopPropagation()}}><Icon>star</Icon></a>
      	  </div>
      	  <div className="message-box" onClick={(e) => e.stopPropagation()}>
      		<textarea placeholder="Enter your review here." className="sttv-textarea" name="review" value={this.state.review} onChange={this.handleChange}></textarea>
      	  </div>
      	</section>
      	<p className="center-align">
          <small>Not to be confused with <Link to='/feedback' >feedback</Link>,
          which is where you can report any issues or make suggestions to improve the course.
          </small>
        </p>
      	<div className="ratings-submit-container center-align">
          <a className="ratings-submit-button btn" onClick={() => console.log("This will submit the review")}>
            <strong>Submit Your Review</strong>
          </a>
        </div>
      </div>
    )
  }

  // Handles changes to first-level state attributes; used throughout
  handleChange({target}) {
  this.setState({
    [target.name]: target.value
    })
  }

  // Placeholder
  Help(props) {
    return(
      <div>Welcome to the Help Page</div>
    )
  }

  // Menu component. Contains links which render different components and become
  // highlighted when they are activated.
  Menu(props) {
    const root = props.location.pathname.split('/').filter(String)[0]
    return(
      <section id="st-sidebar" style={this.state.search ? {pointerEvents : 'none'} : {pointerEvents: 'auto'}} >
        <Link to="/dashboard" className={root == 'dashboard' && !this.state.search ? 'st-link-active' : 'st-app-link'} title='Dashboard' ><Icon>person</Icon></Link>
        <a className={root in this.state.courses && !this.state.search ? 'st-link-active' : 'st-app-link'} title='Course'  onClick={() => this.setState({nav: !this.state.nav})} ><Icon>apps</Icon></a>
        <Link to='/history' className={root == 'history' && !this.state.search ? 'st-link-active' : 'st-app-link'} title='Orders' onClick={() => this.setState({nav: false})} ><Icon>schedule</Icon></Link>
        <Link to='/bookmarks' className={root == 'bookmarks' && !this.state.search ? 'st-link-active' : 'st-app-link'} title='Bookmarks' onClick={() => this.setState({nav: false})} ><Icon>bookmark</Icon></Link>
        <a onClick={() => this.setState({search: !this.state.search})} className={this.state.search ? 'st-link-active' : 'st-app-link'} title='Search' ><Icon>search</Icon></a>
        <a className='st-app-link divider'>&nbsp;</a>
        <Link to='/review' className={root == 'review' && !this.state.search ? 'st-link-active' : 'st-app-link'} title='Review' onClick={() => this.setState({nav: false})} ><Icon>rate_review</Icon></Link>
        <Link to='/feedback' className={root == 'feedback' && !this.state.search ? 'st-link-active' : 'st-app-link'} title='Feedback' onClick={() => this.setState({nav: false})} ><Icon>send</Icon></Link>
        <Link to='/help' className={root == 'help' && !this.state.search ? 'st-link-active' : 'st-app-link'} title='Help' onClick={() => this.setState({nav: false})}><Icon>help</Icon></Link>
        <a onClick={this.courseRefresh} className='st-app-link' title='Refresh'><Icon>refresh</Icon></a>
        <a onClick={this.logout} className='st-app-link' title='Logout'><Icon>exit_to_app</Icon></a>
      </section>
    )
  }

  // Clears the course data in localstorage and fetches new data from the API;
  // updates the state and re-renders if necessary
  courseRefresh() {
    if (confirm("Only do this if advised by a technician at SupertutorTV, as access to your course could be broken or interrupted. Are you sure you want to proceed?")) {
      localStorage.removeItem('sttv_data')
      this.getData()
    }
  }

  // Generic response handler for interacting with the sttv API
  handleResponse(response) {
    return(response.json())
    if (response.ok) {
      return(response.json())
    }
    else {
      if (response.status == 429) {
        this.setState({
          auth: false,
          message: 'Too many requests from this location. Please try again later.',
          username : '',
          password : ''
        })
      }
      return null
    }
  }

  // Searches the course structure and returns links, used by the Search component
  searchCourse(query, object, path) {
    const results = []
    if (!query || !object || query.length < 3) {
      return []
    }
    else {
      for (let i in object) {
        let newPath = path + '/' + i
        if (object[i].data && object[i].data.name.toLowerCase().includes(query)) {
          results.push(newPath)
        }
        else if ('name' in object[i] && object[i].name.toLowerCase().includes(query)) {
          results.push(newPath)
        }
        else {
          const subresult = this.searchCourse(query, object[i].collection, newPath)
          for (let result in subresult) {
            results.push(subresult[result])
          }
        }
      }
    }
    return results
  }

  // Search component; opens a modal over the rest of the course and calls the
  // searchCourse whenever the textbox is updated.
  Search() {
    let links = []
    let index = 0
    try {
      const results = this.searchCourse(this.state.query, this.state.courses[this.state.currentCourse].collection, this.state.currentCourse)
      for (let item in results) {
      links.push(
        <li className="search-result" key={index}>
          <Link to={'/' + results[item]} onClick={() => this.setState({search : false, nav: true})}>
            {cleanup(results[item])}
          </Link>
          <br/>
        </li>
        )
        index++
      }
    }
    catch (error) {
      links = 'Type more than three characters to search this course.'
    }
    return(
      <div className="sttv-modal" onClick={() => this.setState({search: false})} onKeyDown={(e) => {if (e.keyCode == 27){this.setState({search:false})}}}>
        <div className="sttv-search" onClick={(e) => e.stopPropagation()} >
          <h3>Searching: {cleanup(this.state.currentCourse)}</h3>
          <input className="sttv-searchbox" autoComplete="off" type="text" name="query" value={this.state.query} onChange={this.handleChange}>
          </input>
          <ul className="sttv-search-results">
            {links}
          </ul>
        </div>
      </div>
    )
  }

  // Try localStorage; if it is empty, fetch new data
  getData() {
    const data = JSON.parse(localStorage.getItem('sttv_data'))
    if (data !== null) {
      const current = data.user.settings.default_course
      const bookmarkedIds = data.user.bookmarks.map(a => a.data.url)
      this.setState({
        courses: data.courses,
        bookmarkedIds: bookmarkedIds,
        user: data.user,
        currentCourse: current,
        thumb: data.courses[current].data.thumbUrls.plain,
        stage: data.courses[current].data.intro,
        vids: data.user.history,
      })
    }
    else {
      fetch('https://api.supertutortv.com/v2/courses/data', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => this.handleResponse(response))
      .then(items => {
        if (items !== null) {
          localStorage.setItem('sttv_data', JSON.stringify(items.data))
          const currentCourse = items.data.user.settings.default_course
          const thumb = items.data.courses[currentCourse].data.thumbUrls.plain
          const stage = items.data.courses[currentCourse].data.intro
          const bookmarkedIds = items.data.user.bookmarks.map(a => a.data.url)
          // This is basically a rewrite of the first part of getData, but
          // it needs to be done asynchronously so there's no easy way to refactor
          this.setState({
            courses : items.data.courses,
            user: items.data.user,
            bookmarkedIds: bookmarkedIds,
            currentCourse: items.data.user.settings.default_course,
            thumb: thumb,
            stage: stage,
            vids: items.data.user.history,
         })
        }
      })
      .catch(error => {
        this.setState({
          message : 'There was an error fetching your course data. Please check your network connection and try again.'
        })
      })
    }
  }

  // Destroy the old token and user/course info; this causes an automatic
  // redirect to the login page.
  logout() {
      localStorage.removeItem('sttv_data')
      this.setState({
        auth : false,
        courses : {},
        message : 'You have successfully logged out.',
        password : '',
        username : ''
     })
  }

  // Get a token for a user on login; clears localStorage and fetches a new
  // course object
  getToken() {
    fetch('https://api.supertutortv.com/v2/auth/token', {
    method: 'POST',
    accept: 'application/vnd.sttv.app+json',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: this.state.username,
      password: this.state.password,
      })
    })
    .then( response => this.handleResponse(response))
    .then( items => {
      if (items !== null) {
        if (items.code == 'login_success') {
          //this.setState({auth: true, username: '', password : '', message: ''})
          localStorage.removeItem('sttv_data')
          window.location.reload()
          //this.getData()
        }
        else {
          this.setState({
            message: 'Incorrect username or password',
            auth: false,
          })
        }
      }
    })
    .catch(error => {
      this.setState({
        message: 'Unable to log you in. Please check your network connection and try again.'
      })
    })
  }

  // Verify an issued token; get data from localstorage if it exists or from
  // the API if not
  verifyToken() {
    fetch('https://api.supertutortv.com/v2/auth/token/verify', {
    method: 'POST',
    accept: 'application/vnd.sttv.app+json',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      }
    })
    .then( response => this.handleResponse(response))
    .then( items => {
      if (items.data == true) {
        this.setState({auth: true})
        this.getData()
      }
      else {
        window.location.href = 'http://localhost:8888/sttvroot/login'
      }
    })
    .catch(error => {
      this.setState({
        auth: false,
        message: 'Unable to authenticate your session. Please check your network connection and try again.'
      })
    })
  }

  // Login component; tries to get a token from the API with the login information
  Login() {
    return(
      <div>
        <div id="sttv_login_form">
        <p className="message"></p>
        <div className="row">
          <div className="input-field s12">
            <input type="text" name="username" minLength="4" value={this.state.username} onChange={this.handleChange}/>
            <label>Username</label>
          </div>
          <div className="input-field s12">
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
            <label>Password</label>
          </div>
        </div>
        <button className="z-depth-1" id="login-btn" onClick={() => this.getToken()}>Login</button>
        </div>
        {this.state.message}
      </div>
    )
  }

  // Wrapper for the stage and the right sidebar
  Course(props) {
    let link = '/' + this.state.currentCourse
    return(
      <div>
        <div className="st-stage">
          <this.Stage location={props.location.pathname}/>
        </div>
        <div id="video-wrapper">
          <this.Videos vids={this.state.vids} link={this.state.vidLink} />
        </div>
      </div>
    )
  }

  // The Course tree navigation popup
  CourseNav(props) {
    let course = this.state.courses[this.state.currentCourse]
    let link = '/' + this.state.currentCourse
    return(
      <div id="sttv-sections">
        {this.state.nav && <this.Section collection={course.collection}
          link={link} thumb={course.data.thumbUrls.plain} spacing={0} />}
    </div>
    )
  }

  // Component that recursively generates the routes and links for collections
  // until it gets to a video folder
  Section(props) {
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
        route = <Route path={link} render={() => <this.Section
          collection={nextCollection} link={link} thumb={thumb}
          spacing={nextSpacing} />} />
        if ('intro' in currentSection.data) {
          click = () => this.updateStage(String(currentSection.data.intro))
        }
      }
      else {
        let vids = currentSection.collection
        click = () => this.setState({vids: vids, vidLink : link, vidThumbLink: thumb})
      }
      renderedSections.push(
        <div key={section} style={{paddingLeft: 10*spacing}}>
          <Link to={link} onClick={click}> {name} </Link>
          {route}
        </div>
        )
      }
      return renderedSections
    }

  // Creates a bookmark by calling the API; uses the response to update the
  // state and the localStorage object
  createBookmark(url) {
    fetch('https://api.supertutortv.com/v2/courses/data/bookmarks', {
    method: 'PUT',
    accept: 'application/vnd.sttv.app+json',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        url: url
        })
    })
    .then( response => this.handleResponse(response))
    .then( items => {
      if (items !== null) {
        let user = this.state.user
        user.bookmarks.push(items.data)
        const course_data = JSON.parse(localStorage.getItem('sttv_data'))
        course_data.user = user
        localStorage.setItem('sttv_data', JSON.stringify(course_data))
        const bookmarkedIds = user.bookmarks.map(a => a.data.url)
        this.setState({user: user, bookmarkedIds: bookmarkedIds})
      }
      else {
        this.setState({message: 'Could not remove that bookmark. Please try again later.'})
      }
    })
    .catch(error => {
      this.getData()
    })
  }

  // Generates links and thumbnails for an array of videos; used in the
  // right sidebar of the Courses component
  Videos(props) {
    let key = 0
    let videos = []
    const vids = props.vids
    for (let vid in vids) {
      let video = vids[vid]
      let link
      if ('data' in video) {
        link = video.data.url
        video = this.getResourceByUrl(video.data.url)
      }
      else {
        link = props.link + '/' + video.slug
      }
      let thumb = this.state.thumb.replace('||ID||', video.thumb)
      let ref = cleanup(link.slice(1)).concat(' >')
      videos.push(
        <Route path={link} key={key} className="st-video-card">
          <Link to={link} onClick={() => this.updateStage(video.id)}>
            <div className="st-video-card">
              <div>
                  <img className="st-thumb" src={thumb}/>
              </div>
              <span className="st-video-card-title"> {video.name}</span>
            </div>
            <div path={link} />
          </Link>
        </Route>
        )
        key++
      }
    return videos
    }

  // Updates the contents of the video stage, triggering a re-render
  updateStage(id) {
    id = String(id)
    this.setState({'stage' : id})
    }

  // The video stage component; generates an iframe based on this.state.stage
  // and generates a label for the video as well as a bookmark button
  Stage(props) {
    const vid = this.getResourceByUrl(props.location)
    let label
    if (vid.data) {
      label = cleanup(props.location.split('/').filter(String).splice(1).join('/'))
    }
    else {
      const location = props.location.split('/').filter(String).splice(1)
      location.pop()
      label = cleanup(location.join(' > ')) + ' > ' + vid.name
    }
    let frame
    if (this.state.stage == '0') {
      frame = <div className='sttv-course-player' style={{width:'946px', height:'594px', 'background-color' : 'black'}} frameBorder='' title='Intro' webkitallowfullscreen='tr'>
          <h3 style={{'vertical-align':'middle', 'line-height' : '594px', 'text-align':'center'}}>This video will become available when you purchase the full course</h3>
      </div>
    }
    const stage = (this.state.stage !== null) ? this.state.stage : this.state.courses[this.state.currentCourse].intro
    const link = 'https://player.vimeo.com/video/||ID||?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;autoplay=0'.replace('||ID||', this.state.stage)
    frame = <iframe className='sttv-course-player'
      key='stage'
      src={link}
      width='946' height='594' frameBorder='' title='Intro' webkitallowfullscreen='tr'
      allowFullScreen=''></iframe>
    let bookmark
    if (this.state.bookmarkedIds.includes(props.location)) {
      bookmark = <a title='Remove Bookmark' onClick={() => this.deleteBookmark(this.getBookmarkId(this.props.location.pathname))}><Icon>bookmark</Icon></a>
    }
    else {
      bookmark = <a title='Bookmark' onClick={() => this.createBookmark(this.props.location.pathname)}><Icon>bookmark_border</Icon></a>
    }
    let downloads
    if (this.state.downloads != null && this.state.downloads.length > 0) {
      downloads = <a title='Files' onClick={() => this.setState({downloadModal : true})} ><Icon>cloud_download</Icon></a>
    }
    else {
      downloads = <a title='Files' className='download-inactive' ><Icon>cloud_download</Icon></a>
    }
    return(
      <div>
          {this.state.downloadModal && <this.Downloads />}
          {frame}
          <div>
            <div className='st-video-bookmarker'>
              {downloads}
              {bookmark}
            </div>
            <h3 className='st-video-label'>{label} </h3>
          </div>
      </div>
    )
  }

  Downloads(props) {
    let index = 0
    let files = []
    for (let item in this.state.downloads) {
      let download = this.state.downloads[item]
      let file = download.file.split('/').filter(String)
      let res = file[2]
      let section = file[1]
      let test = file[0]
      files.push(
        <li key={index}>
          <a className='download-link' href={'https://api.supertutortv.com/course-dl.php?' + 'res=' + res + '&section=' + section + '&test=' + test + '&hash=' + download.hash}>
            {download.name}
          </a>
        </li>
      )
      index++
    }
    return (
      <div className="sttv-modal" onClick={() => this.setState({downloadModal: false})}>
        <div className="sttv-downloads" onClick={(e) => e.stopPropagation()} >
          <h3>Downloads:</h3>
          <ul>
            {files}
          </ul>
        </div>
      </div>
    )
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
      return(
          <div>
              <Route path='/' component={this.Menu}/>
              <section id="st-app">
                <Route path='/' component={this.Header}/>
                <section id="st-app-inner">
                  <this.CourseNav />
                  {courses}
                  {search}
                  <Switch>
                    <Route className='st-link' path='/dashboard' component={this.Dashboard}/>
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
          loader
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
