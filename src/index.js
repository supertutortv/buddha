import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch, Redirect} from 'react-router-dom'
import {Icon} from 'react-materialize'
import PropTypes from 'prop-types'

const cleanup = (string) => (
  // Replaces slashes with '>'s, capitalizes words, removes dashes, and makes ii's into II's. Keeps 'vs' lowercase.
  string.replace(/\//g,' > ').replace(/\b\w/g,(x)=>(x.toUpperCase())).replace(/-/g, ' ').replace(/i(?=(i|\b))/g, 'I').replace('Vs', 'vs')
)

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
      this.state = {courses : null,
                    currentCourse: '',
                    username : '',
                    password : '',
                    darkMode : false,
                    autoPlay : false,
                    nav : false,
                    token : '',
                    query: '',
                    flag : '',
                    thumb : '',
                    search : false,
                    loading : false,
                    auth : false}
      try {
        const token = JSON.parse(localStorage.getItem('sttv_token'))
        if (token !== null) {
          this.state.loading = true
          this.verifyToken(JSON.parse(localStorage.getItem('sttv_token')))
        }
      }
      catch (error) {
        void(0)
      }
      this.vimeoLink = 'https://player.vimeo.com/video/||ID||?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;autoplay=0'
      this.Header = this.Header.bind(this)
      this.Dashboard = this.Dashboard.bind(this)
      this.History = this.History.bind(this)
      this.Bookmarks = this.Bookmarks.bind(this)
      this.Feedback = this.Feedback.bind(this)
      this.Review = this.Review.bind(this)
      this.Downloads = this.Downloads.bind(this)
      this.Help = this.Help.bind(this)
      this.Menu = this.Menu.bind(this)
      this.Course = this.Course.bind(this)
      this.courseRefresh = this.courseRefresh.bind(this)
      this.logout = this.logout.bind(this)
      this.Videos = this.Videos.bind(this)
      this.updateStage = this.updateStage.bind(this)
      this.Stage = this.Stage.bind(this)
      this.Section = this.Section.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.getResourceByUrl = this.getResourceByUrl.bind(this)
      this.Search = this.Search.bind(this)
      this.genericHandler = this.genericHandler.bind(this)
      this.searchCourse = this.searchCourse.bind(this)
      this.CourseNav = this.CourseNav.bind(this)
      this.updateUserObj = this.updateUserObj.bind(this)
    }

  // Makes sure the correct thumbnails and relevant videos are displayed
  componentDidUpdate(nextProps, nextState) {
      if (this.state.auth) {
        try {
          const nextParent = this.props.location.pathname.split('/').filter(String)
          nextParent.pop()
          const newDir = this.getResourceByUrl(nextParent.join('/'))
          let thumb = this.state.courses[this.state.currentCourse].data.thumbUrls.plain
          if (newDir && newDir.collection && newDir.data && newDir.data.type == 'videos' && newDir.collection != nextState.vids){
            this.setState({vids : newDir.collection, vidLink: '/' + nextParent.join('/'), thumb: thumb})
          }
          else if (nextState.vids == null && this.state.courses.history != null) {
            this.setState({vids: this.state.courses.history, thumb: thumb})
          }
        }
        catch (error) {
          this.getData()
        }
      }
    }

  // Handles changes to the user object
  genericHandler ( path, {target} ) {
    // Handles changes to nested objects
    const helper = function(path, obj, {target}) {
      if (path.length > 0) {
        let key = path.shift()
        obj[key] = helper(path, obj[key], {target})
      }
      else {
        if (target.type == "checkbox") {
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

  // Updates the user object locally and remotely
  updateUserObj (key) {
    this.setState({loading: true})
    const setting = this.state.key
    fetch('https://api.supertutortv.com/v2/courses/data/' + key, {
      method : 'PUT',
      accept: 'application/vnd.sttv.app+json',
      headers: {
        'Authorization': 'Bearer ' + this.state.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.user[key])
      })
    .then(response => this.handleResponse(response))
    .then( items => {
      if (items !== null) {
        const user_obj = this.state.user
        user_obj[key] = items.data[key]
        this.setState({user : user_obj, loading: false})
        const courseData = JSON.parse(localStorage.getItem('sttv_data'))
        courseData.user = this.state.user
        localStorage.setItem('sttv_data', JSON.stringify(courseData))
      }
      })
    .catch(error => {
      console.log(error)
      this.setState({
        loading: false,
        flag : 'There was an error upadating your settings. Please contact STTV support if the problem persists.'
      })})
  }


  // Header that goes at the top of the app
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
                <Route className="st-link" path={'/' + this.state.currentCourse} component={() => (cleanup(this.state.currentCourse))}/>
                <Route className="st-link" path="/dashboard" component={() => ("Dashboard")}/>
                <Route className="st-link" path="/history" component={() => ("History")}/>
                <Route className="st-link" path="/feedback" component={() => ("Feedback")}/>
                <Route className="st-link" path="/bookmarks" component={() => ("Bookmarks")}/>
                <Route className="st-link" path="/review" component={() => ("Review")}/>
                <Route className="st-link" path="/downloads" component={() => ("Downloads")}/>
                <Route className="st-link" path="/help" component={() => ("Help")}/>
                <Route path="/*" exact component={() => ("Oops")}/>
              </Switch>
            </div>
          </div>
      </header>
    )}

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
            </div><br/><div>
              Dark Mode
              <input type='checkbox' label='Dark Mode' name="dark_mode" checked={this.state.dark_mode}
                onChange={(event) => this.genericHandler(['settings'], event)}>
              </input>
            </div><br/><div>
              Autoplay
              <input type='checkbox' label='Autoplay' name='autoplay' checked={this.state.autoplay}
                onChange={(event) => this.genericHandler(['settings'], event)}>
              </input>
            </div><br/>
            <a onClick={() => this.updateUserObj('settings')}><strong>Update Settings </strong><Icon>cloud_upload</Icon></a>
            <div>
              <h2>Your Information:</h2>
              <small>(click to edit)</small>
              <div>
                First Name
                <input type='text' className='info-input' name='firstname' value={this.state.user.userdata.firstname} onChange={(event) => this.genericHandler(['userdata'], event)}/>
              </div><div>
                Last Name
                <input type='text' className='info-input' name='lastname' value={this.state.user.userdata.lastname} onChange={(event) => this.genericHandler(['userdata'], event)} />
              </div><div>
                <br/>
                Line 1 <input type='text' className='info-input' name='line1' value={this.state.user.userdata.address.line1} onChange={(event) => this.genericHandler(['userdata', 'address'], event)} />
                <br/>
                Line 2 <input type='text' className='info-input' name='line2' value={this.state.user.userdata.address.line2} onChange={(event) => this.genericHandler(['userdata', 'address'], event)} />
                <br/>
                City <input type='text' className='info-input' name='city' value={this.state.user.userdata.address.city} onChange={(event) => this.genericHandler(['userdata', 'address'], event)} />
                <br/>
                State <input type='text' className='info-input' name='state' value={this.state.user.userdata.address.state} onChange={(event) => this.genericHandler(['userdata', 'address'], event)} />
                <br/>
                Zip <input type='text' className='info-input' name='zip' value={this.state.user.userdata.address.zip} onChange={(event) => this.genericHandler(['userdata', 'address'], event)} />
              </div>
              <br/>
              <a type="button" onClick={() => this.updateUserObj('userdata')}><strong>Update Information </strong><Icon>cloud_upload</Icon></a>
            </div><div>
              <h2>Your Orders:</h2>
              {this.state.user.userdata.orders}
            </div>
          </div>
        </div>
      )
    }

  // History component
  History(props) {
    let vids = []
    let index = 0
    const history = this.state.user.history
    const thumbURL = this.state.thumb
    for (let item in history) {
      let url = history[item].data.url
      let vid = this.getResourceByUrl(url)
      let thumb = thumbURL.replace('||ID||', vid.thumb)
      vids.push(
        <div key={index} className="video-in-grid">
          <Link to={url} onClick={() => this.updateStage(String(vid.ID))}>
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
      <div className='video-grid'>
        {vids}
      </div>
      )
    }

  deleteBookmark(id) {
    this.setState({loading: true})
    fetch('https://api.supertutortv.com/v2/courses/data', {
    method: 'DELETE',
    accept: 'application/vnd.sttv.app+json',
    headers: {
      'Authorization': 'Bearer ' + this.state.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: id
      })
    })
    .then( response => this.handleResponse(response))
    .then( items => {
      console.log(items.data[0].id)
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
        this.setState({loading: false, user: user})
      }
      else {
        this.setState({loading: false, flag: "Could not remove that bookmark. Please try again later."})
      }
      })
  }

  // Bookmarks component
  Bookmarks(props) {
    let bookmarks = []
    const thumbURL = this.state.thumb
    for (let item in this.state.user.bookmarks) {
      let mark = this.state.user.bookmarks[item]
      let url = this.state.user.bookmarks[item].data.url
      let vid = this.getResourceByUrl(url)
      let id
      let thumb
      if (vid.data && vid.data.type == 'collection') {
        id = vid.data.intro
        thumb = id
      }
      else {
        id = vid.ID
        thumb = vid.thumb
      }
      thumb = thumbURL.replace('||ID||', thumb)
      bookmarks.push(
        <div key={mark.id} className="video-in-grid">
          <a className="st-video-remover" onClick={() => this.deleteBookmark(mark.id)} ><i className="material-icons">highlight_off</i></a>
          <Link to={url} onClick={() => this.updateStage(String(id))}>
            <div >
              <div>
                  <img className="grid-thumb" src={thumb} className="z-depth-3"/>
              </div>
              <span className="video-grid-title"> {cleanup(url.slice(1))} </span>
            </div>
          </Link>
        </div>
      )
    }
    return(
      <div className="video-grid">
        {bookmarks}
      </div>
      )
    }

  // The name says it all here
  getResourceByUrl(url) {
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

  // Feedback component; needs styling
  Feedback(props) {
      return(
        <div id="course-feedback">
          <h2 className="header center-align">Feedback</h2>
          <div className="col s12 center-align">
            <p>
              Drop us a line if you catch any mistakes, have suggestions for new
              content, or would just like to let us know how we're helping you get a
              better score! If you'd like to rate us so future students can see what
              you think of the course, you can do that <Link to='/review' style={{text: 'bold'}} >here</Link>.
              (By the way, this is just between us... no one else will see
              your feedback but the fine folks here at SupertutorTV.)
           </p>
         </div>
        <div className="col s12" id="feedback-post-form">
          <div className="overlay"></div>
          <textarea placeholder="Enter your feedback here." id="feedback-content">
          </textarea>
          <div className="feedback-submit-container center-align">
            <a className="feedback-submit-button btn" onClick={() => console.log('This will submit feedback')}>
              <strong>Post Feedback</strong>
            </a>
          </div>
        </div>
          <div id="feedback-container"></div>
      </div>
      )
    }

  // Review component; needs styling
  Review(props) {
    return(
      <div id="ratings-modal-wrapper">
      	<div className="header center-align">
      		<h2>Rate this course</h2>
      	  <p>Rate us and leave a review so<b> others </b>
          can see how this course has helped you!</p>
      	</div>
      	<section className="rating-widget">
      	  <div className="rating-stars center-align">
      		<ul id="stars">
      			<Icon>star</Icon>
            <Icon>star</Icon>
            <Icon>star</Icon>
            <Icon>star</Icon>
            <Icon>star</Icon>
      		</ul>
      	  </div>
      	  <div className="message-box">
      		<textarea placeholder="Enter your review here." id="review-content"></textarea>
      	  </div>
      	</section>
      	<p className="center-align">
          <small>Not to be confused with <Link to='/feedback' >feedback</Link>,
          which is where you can make suggestions on improving the course or where
          you can report any issues.
          </small>
        </p>
      	<div className="ratings-submit-container center-align">
          <a className="ratings-submit-button btn" onClick={() => console.log('This will submit the review')}>
            <strong>Post Your Review</strong>
          </a>
        </div>
      </div>
      )
    }

    // Placeholder
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
      })
    }

  // Placeholder
  Downloads(props) {
      return(
        <div>Welcome to the Downloads Page</div>
      )
    }

  // Placeholder
  Help(props) {
      return(
        <div>Welcome to the Help Page</div>
      )
    }

  // Menu component
  Menu(props) {
    const root = props.location.pathname.split('/').filter(String)[0]
    return(
      <section id="st-sidebar" style={this.state.search ? {'pointerEvents' : 'none'} : {'pointerEvents': 'auto'}} >
        <Link to="/dashboard" className={root == "dashboard" && !this.state.search ? "st-link-active" : "st-app-link"} title="Dashboard" ><Icon>person</Icon></Link>
        <a className={root in this.state.courses && !this.state.search ? "st-link-active" : "st-app-link"} title="Course"  onClick={() => this.setState({nav: !this.state.nav})} ><Icon>apps</Icon></a>
        <Link to="/downloads" className={root == "downloads" && !this.state.search ? "st-link-active" : "st-app-link"} title="Downloads" onClick={() => this.setState({nav: false})} ><Icon>cloud_download</Icon></Link>
        <Link to="/history" className={root == "history" && !this.state.search ? "st-link-active" : "st-app-link"} title="Orders" onClick={() => this.setState({nav: false})} ><Icon>schedule</Icon></Link>
        <Link to="/bookmarks" className={root == "bookmarks" && !this.state.search ? "st-link-active" : "st-app-link"} title="Bookmarks" onClick={() => this.setState({nav: false})} ><Icon>bookmark</Icon></Link>
        <a onClick={() => this.setState({search: !this.state.search})} className={this.state.search ? "st-link-active" : "st-app-link"} title="Search" ><Icon>search</Icon></a>
        <a className="st-app-link">&nbsp;</a>
        <Link to="/review" className={root == "review" && !this.state.search ? "st-link-active" : "st-app-link"} title="Review" onClick={() => this.setState({nav: false})} ><i className="material-icons">rate_review</i></Link>
        <Link to="/feedback" className={root == "feedback" && !this.state.search ? "st-link-active" : "st-app-link"} title="Feedback" onClick={() => this.setState({nav: false})} ><i className="material-icons">send</i></Link>
        <Link to="/help" className={root == "help" && !this.state.search ? "st-link-active" : "st-app-link"} title="Help" onClick={() => this.setState({nav: false})} ><i className="material-icons">help</i></Link>
        <a onClick={this.courseRefresh} className="st-app-link" title="Refresh"><i className="material-icons">refresh</i></a>
        <a onClick={this.logout} className="st-app-link" title="Logout"><i className="material-icons">exit_to_app</i></a>
      </section>
      )
    }

  // Clears localstorage and calls the API; triggers a re-render with this.setState
  courseRefresh() {
      if (confirm('Only do this if advised by a technician at SupertutorTV, as access to your course could be broken or interrupted. Are you sure you want to proceed?')) {
        localStorage.removeItem('sttv_data')
        this.getData()
      }
    }

  // Generic response handler for authentication
  handleResponse(response) {
    if (response.ok) {
      return(response.json())
    }
    else {
      if (response.status == 403) {
        this.setState({
          auth: false,
          loading: false,
          flag: 'Your session has expired.',
          username : '',
          password : ''
        })
      }
      else if (response.status == 429) {
        this.setState({
          auth: false,
          loading: false,
          flag: 'Too many requests from this location. Please try again later.',
          username : '',
          password : ''
        })
      }
      return null
    }
  }

  // Searches the course structure and returns links
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

  // Search component
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
      console.log(error)
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
      this.setState({
        courses: data.courses,
        user: data.user,
        currentCourse: current,
        thumb: data.courses[current].data.thumbUrls.plain,
        stage: data.courses[current].data.intro,
        vids: data.user.history,
        loading: false
      })
    }
    else {
      fetch('https://api.supertutortv.com/v2/courses/data', {
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Content-Type': 'application/json'
        }
        })
      .then(response => this.handleResponse(response))
      .then( items => {
        if (items !== null) {
          localStorage.setItem('sttv_data', JSON.stringify(items.data))
          const currentCourse = items.data.user.settings.default_course
          const thumb = items.data.courses[currentCourse].data.thumbUrls.plain
          const stage = items.data.courses[currentCourse].data.intro
          this.setState({
            courses : items.data.courses,
            user: items.data.user,
            currentCourse: items.data.user.settings.default_course,
            thumb: thumb,
            stage: stage,
            vids: items.data.user.history,
            loading: false
           })
        }
      })
      .catch(error => {
        console.log(error)
        this.setState({
          loading: false,
          flag : 'There was an error fetching your course data. Please check your network connection and try again.'
        })})
    }
  }

  // Destroy the old token and user/course info
  logout() {
      localStorage.removeItem('sttv_token')
      localStorage.removeItem('sttv_data')
      this.setState({auth : false,
                     courses : {},
                     flag : 'You have successfully logged out.',
                     password : '',
                     token : '',
                     username : ''
                   })
  }

  // Get a token for a user on login
  getToken() {
    this.setState({loading: true})
    fetch('https://api.supertutortv.com/v2/auth/token', {
    method: 'POST',
    accept: 'application/vnd.sttv.app+json',
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
          localStorage.setItem('sttv_token', JSON.stringify(items.token))
          this.setState({token : items.token, auth: true, username: '', password : '', flag: ''})
          localStorage.removeItem('sttv_data')
          this.getData()
        }
        else {
          this.setState({
            flag: 'Incorrect username or password',
            auth: false,
            loading: false})
        }
      }
      })
    .catch(error => {
      console.log(error)
      this.setState({
        loading: false,
        flag: 'Unable to log you in. Please check your network connection and try again.'
      })
    })
  }

  // Verify an issued token
  verifyToken(token) {
    fetch('https://api.supertutortv.com/v2/auth/token/verify', {
    method: 'POST',
    accept: 'application/vnd.sttv.app+json',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      }
    })
    .then( response => this.handleResponse(response))
    .then( items => {
      if (items) {
        this.setState({auth: true, token: token})
        this.getData()
      }
      else {
        this.setState({auth: false, token: ''})
      }
    })
    .catch(error => {
      this.setState({
        auth: false,
        flag: 'Unable to authenticate your session. Please check your network connection and try again.',
        loading: false
      })
    })
  }

  // Login component
  Login() {
    return(
      <div id="sttv_login_form" type="POST">
  		<p className="message"></p>
  		<div className="row">
  			<div className="input-field s12">
  				<input type="text" name="username" id="sttv_user" minLength="4" value={this.state.username} onChange={this.handleChange}/>
  				<label data-error="Must be at least 4 characters" data-success="Good job!">Username</label>
  			</div>
  			<div className="input-field s12">
  				<input type="password" name="password" id="sttv_pass" value={this.state.password} onChange={this.handleChange}/>
  				<label className="">Password</label>
  			</div>
  		</div>
  		<button type="submit" className="z-depth-1" id="login-btn" onClick={() => this.getToken()}>Login</button>
      </div> )}

  // Wrapper for the stage and the recursive rendering function
  Course(props) {
    let link = '/' + this.state.currentCourse
    return(
      <div >
        <div>
          <this.Stage location={props.location.pathname}/>
        </div>
        <div id="video-wrapper">
          <this.Videos vids={this.state.vids} link={this.state.vidLink} />
        </div>
      </div>)
    }

  // The Course tree navigation popup
  CourseNav(props) {
    let course = this.state.courses[this.state.currentCourse]
    let link = '/' + this.state.currentCourse
    return(
      <div id="sttv-sections">
        {this.state.nav && <this.Section collection={course.collection}
          link={link} thumb={course.data.thumbUrls.plain} spacing={0} />}
    </div>)
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
        if ("intro" in currentSection.data) {
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

  createBookmark(url) {
    this.setState({loading: true})
    fetch('https://api.supertutortv.com/v2/courses/data/bookmarks', {
    method: 'PUT',
    accept: 'application/vnd.sttv.app+json',
    headers: {
      'Authorization': 'Bearer ' + this.state.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        url: url
      })
    })
    .then( response => this.handleResponse(response))
    .then( items => {
      console.log(items)
      if (items !== null) {
        let user = this.state.user
        user.bookmarks.push(items.data)
        const course_data = JSON.parse(localStorage.getItem('sttv_data'))
        course_data.user = user
        localStorage.setItem('sttv_data', JSON.stringify(course_data))
        this.setState({loading: false, user: user})
      }
      else {
        this.setState({loading: false, flag: "Could not remove that bookmark. Please try again later."})
      }
      })
  }

  makeRequest(location, method, body) {
    this.setState({loading : true})
    fetch(location, {
      accept: 'application/vnd.sttv.app+json',
      method: method,
      headers: {
        'Authorization': 'Bearer ' + this.state.token,
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(body)
    })
    .then( response => this.handleResponse(response))
  }

  // Links and routes for individual videos
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
          <Link to={link} onClick={() => this.updateStage(video.ID)}>
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

  // The video stage component
  Stage(props) {
    const location = props.location
    let frame
    if (this.state.stage == "0") {
          frame = <div className="sttv-course-player" style={{width:"946px", height:"594px", "background-color" : "black"}} frameBorder="" title="Intro" webkitallowfullscreen="tr">
              <h3 style={{'vertical-align':'middle', 'line-height' : '594px', 'text-align':'center'}}>This video will become available when you purchase the full course</h3>
          </div>
    }
    const stage = (this.state.stage !== null) ? this.state.stage : this.state.courses[this.state.currentCourse].intro
    const link = this.vimeoLink.replace('||ID||', this.state.stage)
    frame = <iframe className="sttv-course-player"
      key='stage'
      src={link}
      width="946" height="594" frameBorder="" title="Intro" webkitallowfullscreen="tr"
      allowFullScreen=""></iframe>
    return(
      <div>
          {frame}
          <div>
            <h3>{cleanup(location.split('/').filter(String).splice(1).join(' > '))}</h3>
            <a className="st-video-bookmarker" onClick={() => this.createBookmark(location)} ><i className="material-icons">bookmark</i></a>
          </div>
      </div>
      )
    }

  // Calls the Menu and various page components; Menu has the links
  // corresponding to these routes.
  render() {
    if (this.state.loading) {
      return 'Loading'
    }
    else if (!this.state.auth) {
      const message = <span>{this.state.flag}</span>
      return(
        <section id="st-app">
              <Switch>
                <Route path="/login" component={this.Login}/>
                <Redirect push to="/login"/>
              </Switch>
              {message}
        </section>
      )}
    else {
      let courses = []
      for (let course in this.state.courses) {
        courses.push(
          <Route key={course} className="st-link" path={'/' + course} component={this.Course}/>
        )
      }
      let search
      if (this.state.search) {
        search = <this.Search />
      }
      return(
          <div>
              <Route path="/" component={this.Menu}/>
              <section id="st-app">
                <Route path="/" component={this.Header}/>
                <section id="st-app-inner">
                  <this.CourseNav />
                  {courses}
                  {search}
                  <Switch>
                    <Route className="st-link" path="/dashboard" component={this.Dashboard}/>
                    <Route className="st-link" path={'/' + this.state.currentCourse}/>
                    <Route className="st-link" path="/history" component={this.History}/>
                    <Route className="st-link" path="/feedback" component={this.Feedback}/>
                    <Route className="st-link" path="/bookmarks" component={this.Bookmarks}/>
                    <Route className="st-link" path="/review" component={this.Review}/>
                    <Route className="st-link" path="/downloads" component={this.Downloads}/>
                    <Route className="st-link" path="/help" component={this.Help}/>
                    <Route path="/(login|)" exact component={() => <Redirect to="/dashboard"/>}/>
                    <Route path="/*" exact component={() => <Four04 />}/>
                  </Switch>
                </section>
              </section>
          </div>
      )}
      }
  }

// Export the whole thing
ReactDOM.render (
  <BrowserRouter>
      <Route path="/" component={App} />
  </BrowserRouter>,
  document.getElementById("app"));
