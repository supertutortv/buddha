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
  constructor() {
      super()
      this.verifyToken = this.verifyToken.bind(this)
      this.getData = this.getData.bind(this)
      this.Login = this.Login.bind(this)
      this.handleResponse = this.handleResponse.bind(this)
      this.state = {courseData : null,
                    userData: null,
                    currentCourse: 'the-best-act-prep-course-ever',
                    username : '',
                    password : '',
                    darkMode : true,
                    autoPlay : true,
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
      catch ( e ) {
        void(0)
      }
      try {
        const data = JSON.parse(localStorage.getItem('sttv_data'))
        if ( data !== null ) {
          this.state.courseData = data.courses
          this.state.userData = data.user
          // Dummy data until the endpoint is set up. Requires page reload after
          // fresh request.
          this.state.userData.personal = {
            'firstName' : 'Arthur',
            'lastName' : 'Dent'
          }
          this.state.stage = String(data.courses[this.state.currentCourse].intro)
        }
        else {
          this.state.token = ''
          this.state.auth = false
        }
      }
      catch (e) {
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
      this.Courses = this.Courses.bind(this)
      this.courseRefresh = this.courseRefresh.bind(this)
      this.logout = this.logout.bind(this)
      this.setUpVids = this.setUpVids.bind(this)
      this.updateStage = this.updateStage.bind(this)
      this.makeStage = this.makeStage.bind(this)
      this.setUpSections = this.setUpSections.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.getVideoByUrl = this.getVideoByUrl.bind(this)
      this.Search = this.Search.bind(this)
      this.settingsHandler = this.settingsHandler.bind(this)
    }

  settingsHandler( {target} ) {
    const setting = {[target.name]: target.checked}
    fetch('https://api.supertutortv.com/v2/courses/data/settings', {
      method : 'PUT',
      accept: 'application/vnd.sttv.app+json',
      headers: {
        'Authorization': 'Bearer ' + this.state.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(setting)
      })
    .then(response => this.handleResponse(response))
    .then( items => {
      if (items !== null) {
      this.setState(setting)
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
  Header() {
    const base = window.location.href.split('/').filter(String).splice(2)
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

  // Renders the dashboard page
  Dashboard() {
    let greeting
    if (this.state.userData.personal.firstName !== null) {
      greeting = <h3> Welcome to the Dashboard, {this.state.userData.personal.firstName} </h3>
    }
    else {
      greeting = <h3> We're having trouble fetching your SupertutorTV profile. Try refreshing the course data, or,
      if the problem persists, contact a STTV technician.</h3>
    }
    let courses = []
    for (let course in this.state.courseData) {
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
          {greeting}
          <div>
            <h1>
              Settings:
            </h1>
            <div>
              Your courses:
              {courses}
            </div>
            <br/>
            <div>
              Dark Mode:
              <input type='checkbox' label='Dark Mode' name='darkMode' checked={this.state.darkMode}
                onChange={this.settingsHandler}>
              </input>
            </div>
            <br/>
            <div>
              Autoplay:
              <input type='checkbox' label='Autoplay' name='autoPlay' checked={this.state.autoPlay}
                onChange={this.settingsHandler}>
              </input>
            </div>
            {this.state.flag}
          </div>
        </div>
      )
    }

  History() {
    let vids = []
    const history = this.state.userData.history
    const thumbURL = this.state.courseData[this.state.currentCourse].thumbUrls.plain
    for (let item in history) {
      let url = history[item].data.url
      let vid = this.getVideoByUrl(url)
      let thumb = thumbURL.replace('||ID||', vid.thumb)
      vids.push(
        <div key={vid.slug} className="video-in-grid">
          <Link to={url} onClick={() => this.updateStage(vid.ID)}>
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
      <div className='video-grid'>
        {vids}
      </div>
      )
    }

    Bookmarks() {
      let bookmarks = []
      for (let item in this.state.userData.bookmarks) {
        let url = this.state.userData.bookmarks[item].data.url
        let vid = this.getVideoByUrl(url)
        let thumb = this.state.courseData[this.state.currentCourse].thumbUrls.plain.replace('||ID||', vid.thumb)
        bookmarks.push(
          <div key={vid.slug} className="video-in-grid">
            <Link to={url} onClick={() => this.updateStage(vid.ID)}>
              <div >
                <div>
                    <div className="st-video-remover" onClick={() => console.log('remove this video from history!')} ><i className="material-icons">highlight_off</i></div>
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

  getVideoByUrl(url) {
    const lookup = url.split('/').filter(String)
    let obj = this.state.courseData
    while (true) {
      if (lookup == []) {
        return(obj)
      }
      else if (lookup[0] in obj) {
        obj = obj[lookup.shift()]
      }
      else if ('sections' in obj) {
        obj = obj['sections']
      }
      else if ('subsec' in obj) {
        obj = obj['subsec']
      }
      else if ('videos' in obj) {
        obj = obj['videos']
      }
      else if ('subjects' in obj) {
        obj = obj['subjects']
      }
      else {
        return( obj )
      }
    }
  }

  Feedback() {
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

  Review() {
    return(
      <div id="ratings-modal-wrapper">
      	<header className="header center-align">
      		<h2>Rate this course</h2>
      	  <p>Rate us and leave a review so<b> others </b>
          can see how this course has helped you!</p>
      	</header>
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

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
      })
    }

  Downloads() {
      return(
        <div>Welcome to the Downloads Page</div>
      )
    }

  Help() {
      return(
        <div>Welcome to the Help Page</div>
      )
    }

  Menu() {
    return(
      <section id="st-sidebar">
        <Link to="/dashboard" className="st-app-link dashboard" title="Dashboard" ><Icon>person</Icon></Link>
        <Link to={this.state.currentCourse} className="st-app-link my-courses" title="Courses"  onClick={() => this.updateStage(this.state.courseData[this.state.currentCourse].intro)} ><Icon>apps</Icon></Link>
        <Link to="/downloads" className="st-app-link downloads" title="Downloads" ><Icon>cloud_download</Icon></Link>
        <Link to="/history" className="st-app-link history" title="Orders" ><Icon>schedule</Icon></Link>
        <Link to="/bookmarks" className="st-app-link bookmarked" title="Bookmarks" ><Icon>bookmark</Icon></Link>
        <a onClick={() => this.setState({search: !this.state.search})} className="st-app-link search" title="Search" ><Icon>search</Icon></a>
        <a className="st-app-link divider">&nbsp;</a>
        <Link to="/review" className="st-app-link rate-course" title="Review" ><i className="material-icons">rate_review</i></Link>
        <Link to="/feedback" className="st-app-link feedback" title="Feedback" ><i className="material-icons">send</i></Link>
        <Link to="/help" className="st-app-link help" title="Help" ><i className="material-icons">help</i></Link>
        <a onClick={this.courseRefresh} className="st-app-link update" title="Refresh"><i className="material-icons">refresh</i></a>
        <a onClick={this.logout} className="st-app-link logout" title="Logout"><i className="material-icons">exit_to_app</i></a>
      </section>
      )
    }

  // Clears localstorage and calls the API; triggers a re-render with this.setState
  courseRefresh() {
      if (confirm('Only do this if advised by a technician at SupertutorTV, as access to your course could be broken or interrupted. Are you sure you want to proceed?')) {
        localStorage.removeItem('data')
        this.getData()
      }
    }

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

  Search() {
    let vids
    try {
      vids = []
      results = this.getVideoByUrl(this.state.query)
      for (let item in results) {
        let url = results[item].data.url
        let vid = this.getVideoByUrl(url)
        let thumb = thumbURL.replace('||ID||', vid.thumb)
      vids.push(
        <div key={vid.slug}>
          <Link to={url} onClick={() => this.updateStage(vid.ID)}>
            <div >
              <div>
                  <img src={thumb} className="z-depth-3"/>
              </div>
              <span> {cleanup(url.slice(1))} </span>
            </div>
          </Link>
        </div>
        )
      }
    }
    catch (e) {
      vids = 'No results found.'
    }
    return(
      <div className='sttv-modal'>
        <div className='sttv-search'>
          <div onClick={() => this.setState({search: false})} className='search-exit'><i className="material-icons">close</i></div>
          <h3>Searching: {cleanup(this.state.currentCourse)}</h3>
          <input type="text" name="query" value={this.state.query} onChange={this.handleChange}>
          </input>
          <div>
            {vids}
          </div>
        </div>
      </div>
    )
  }

  getData() {
    this.setState({loading: true})
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
        this.setState({
          courseData : items.data.courses,
          loading: false,
          userData : items.data.user,
          stage : items.data.courses[this.state.currentCourse].intro
         })
      }
      console.log(this.state)
    })
    .catch(error => {
      console.log(error)
      this.setState({
        loading: false,
        flag : 'There was an error fetching your course data. Please check your network connection and try again.'
      })})
  }

  logout() {
      localStorage.removeItem('sttv_token')
      localStorage.removeItem('data')
      this.setState({auth : false,
                     courses : {},
                     flag : 'You have successfully logged out.',
                     password : '',
                     token : '',
                     username : ''
                   })
  }

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
          this.setState({token : items.token, auth: true, username: '', password : ''})
          this.getData()
        }
        else {
          this.setState({
            'flag': 'Incorrect username or password',
            auth: false,
            loading: false})
        }
      }
      })
    .catch( error => {
      console.log(error)
      this.setState({
        loading: false,
        flag: 'Unable to log you in. Please check your network connection and try again.'
      })
    })
  }


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
        if ( items !== null) {
          this.setState({auth: true, token: token, loading: false})
          console.log(this.state)
        }
      })
      .catch(error => {
        this.setState({
          flag: 'Unable to authenticate your session. Please check your network connection and try again.',
          loading: false
        })
      })
    }

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
  Courses() {
    let link = '/' + this.state.currentCourse
    let course = this.state.courseData[this.state.currentCourse]
    return(
      <div>
        {this.makeStage(course.intro)}
        {this.setUpSections(course.sections, link, course.thumbUrls.plain, 0)}
      </div> )
    }

    // Function that recursively generates the routes and links for sections
    // until it gets to a video folder
    setUpSections(sections, topLink, thumb, spacing) {
      let renderedSections = []
      for (let section in sections) {
        if (section !== 'type') {
          let name
          if ('name' in sections[section]) {
            name = sections[section].name
          }
          else if ('title' in sections[section]) {
            name = sections[section].title
          }
          let link = topLink + '/' + section
          let route
          let render
          if ('subsec' in sections[section]) {
            route = <Route path={link}
              render={() => this.setUpSections(sections[section].subsec, link,  thumb, spacing+1)}/>
          }
          else if ('subjects' in sections[section]) {
            route = <Route path={link}
            render={() => this.setUpSections(sections[section].subjects, link, thumb, spacing+1)}/>
          }
          else if ('videos' in sections[section]) {
            route = <Route path={link}
            render={() => (
              <div id='video-wrapper'>
                {this.setUpVids(sections[section].videos, link, thumb)}
              </div>)}/>
          }
          let click
          if ('intro' in sections[section]) {
            click = () => this.updateStage(sections[section].intro)
          }
          renderedSections.push(
            <div key={section} style={{paddingLeft: 10*spacing}}>
              <Link to={link} onClick={click} render={render}> {name} </Link>
              {route}
            </div>
            )
          }
        }
        return renderedSections
      }

  // Links and routes for individual videos
  setUpVids(vids, linkTo, thumbUrl) {
    let videos = []
    for (let vid in vids) {
      let video = vids[vid]
      let link = linkTo + '/' + video.slug
      let thumb = thumbUrl.replace('||ID||', video.thumb)
      let ref = cleanup(linkTo.slice(1)).concat(' >')
      videos.push(
        <div key={video.slug} className="st-video-card">
          <Link to={link} onClick={() => this.updateStage(video.ID)}>
            <div className="st-video-card">
              <div>
                  <img className="st-thumb" src={thumb}/>
              </div>
              <span className="st-video-card-title"> {video.name}</span>
            </div>
          </Link>
          <div path={link} />
        </div>
        )
      }
    return videos
    }

  // Updates the contents of the video stage, triggering a re-render
  updateStage(id) {
    id = String(id)
    this.setState({'stage' : id})
    }

  // Makes the video stage
  makeStage() {
    const stage = (this.state.stage !== null) ? this.state.stage : this.state.courseData[this.state.currentCourse].intro
    const link = this.vimeoLink.replace('||ID||', this.state.stage)
    return(
      <div>
        <iframe className="sttv-course-player"
          key='stage'
          src={link}
          width="946" height="594" frameBorder="" title="Intro" webkitallowfullscreen="tr"
          allowFullScreen=""></iframe>
        <h3>{cleanup(window.location.href.split('/').filter(String).splice(2).join('/'))}</h3>
      </div>
      )
    }

  // Calls the menu and the page components; menu has the links that these routes
  // pick up on, which determines whether or not they are rendered
  render() {
    if (this.state.loading) {
      return 'Loading'
    }
    else if (!this.state.auth) {
      const message = <span>{this.state.flag}</span>
      return(
        <section id="st-app">
          <BrowserRouter>
            <div>
              <Switch>
                <Route path="/login" component={this.Login}/>
                <Redirect push to="/login"/>
              </Switch>
              {message}
            </div>
          </BrowserRouter>
        </section>
      )}
    else {
      let courses = []
      for (let course in this.state.courseData) {
        courses.push(
          <Route key={course} className="st-link" path={'/' + course} component={this.Courses}/>
        )
      }
      let search
      if (this.state.search) {
        search = <this.Search />
      }
      return(
        <BrowserRouter>
          <div>
              <this.Menu/>
              <section id="st-app">
                <Route path="/" component={this.Header}/>
                <section id="st-app-inner">
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
        </BrowserRouter>
      )}
      }
    }

// Export the whole thing
ReactDOM.render (
    <App />,
  document.getElementById("app"));
