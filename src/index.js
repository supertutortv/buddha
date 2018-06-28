import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch, Redirect} from 'react-router-dom'
import {Icon} from 'react-materialize'
import PropTypes from 'prop-types'

const cleanup = (string) => (
  string.replace(/\//g,' > ').replace(/\b\w/g,(x)=>(x.toUpperCase())).replace(/-/g, ' ')
)

// Class that controls the state and rendered components of the app
class App extends React.Component {
  constructor() {
      super()
      this.verifyToken = this.verifyToken.bind(this)
      this.state = {courses : null,
                    currentCourse: 'the-best-act-prep-course-ever',
                    stage: '-1',
                    user : '',
                    pw : '',
                    token : '',
                    flag : '',
                    thumb : '',
                    loading : false,
                    auth : false}
      try {
        const token = JSON.parse(localStorage.getItem('sttv_token'))
        if (token !== null){
          this.state.loading = true
          this.verifyToken(JSON.parse(localStorage.getItem('sttv_token')))
        }
      }
      catch (e) {
        void(0)
      }
      try {
        const data = JSON.parse(localStorage.getItem('data'))
        if (data !== null){
          this.state.courses = data.courses
          this.state.user = data.user
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
      this.Login = this.Login.bind(this)
      this.getData = this.getData.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.getVideoByUrl = this.getVideoByUrl.bind(this)
    }


  // Header that goes at the top of the app
  Header() {
    const base = window.location.href.split('/').filter(String).splice(2)
    let title
    switch (base[0]) {
      case 'courses':
        title = this.state.currentCourse.replace(/-/g, ' ')
        break
      default:
        title = cleanup(base.join('/'))
      }
    return (
      <header>
          <div id="st-header-inner">
            <div id="st-header-branding">
              <img src="https://supertutortv.com/wp-content/uploads/2016/10/sttv_site_logo.png" alt="SupertutorTV"/>
            </div>
            <div id="st-header-view-title">{title}</div>
          </div>
      </header>
    )}

  // Renders the dashboard page
  Dashboard() {
    return (
      <div>Welcome to the Dashboard</div>
      )
    }

  History() {
    // Should be able to run setUpVids on this when the data is real
    let history = []
    for (let item in this.state.user.history) {
      history.push(
        <div key={item}>
          {String((this.getVideoByUrl(this.state.user.history[item].data.url)))}
        </div>
      )
    }
    return (
      <div>Your History:
      {history}
      </div>
      )
    }

  getVideoByUrl(url) {
    const lookup = url.split('/').filter(String)
    let obj = this.state.courses
    while (true) {
      if (lookup == []){
        return obj
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
      else {
        return obj
      }
    }
  }

  Feedback() {
      return (
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
    return (
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
      });
    }

  Downloads() {
      return (
        <div>Welcome to the Downloads Page</div>
      )
    }

  Bookmarks() {
    let bookmarks = []
    for (let item in this.state.user.bookmarks) {
      let url = this.state.user.bookmarks[item].data.url
      let vid = this.getVideoByUrl(url)
      let thumb = this.state.courses[this.state.currentCourse].thumbUrls.plain.replace('||ID||', vid.thumb)
      bookmarks.push(
        <div key={vid.slug} className="st-video-card">
          <Link to={url} onClick={() => this.updateStage(vid.ID)}>
            <div className="st-video-card">
              <div>
                  <div className="st-video-remover" onClick={() => console.log('remove this video!')} ><i className="material-icons">highlight_off</i></div>
                  <img src={thumb} className="z-depth-3"/>
              </div>
              <span className="st-video-card-title"> {cleanup(url.slice(1))} </span>
            </div>
          </Link>
        </div>
      )
    }
    return (
      <div>Your Bookmarks:
        {bookmarks}
      </div>
      )
    }

  Help() {
      return (
        <div>Welcome to the Help Page</div>
      )
    }

  Menu() {
    return (
      <section id="st-sidebar">
        <Link to="/dashboard" className="st-app-link dashboard" title="Dashboard" ><Icon>person</Icon></Link>
        <Link to="/courses" className="st-app-link my-courses" title="Courses"  onClick={() => this.updateStage(-1)} ><Icon>apps</Icon></Link>
        <Link to="/downloads" className="st-app-link downloads" title="Downloads" ><Icon>cloud_download</Icon></Link>
        <Link to="/history" className="st-app-link history" title="Orders" ><Icon>schedule</Icon></Link>
        <Link to="/bookmarks" className="st-app-link bookmarked" title="Bookmarks" ><Icon>bookmark</Icon></Link>
        <Link to="/search" className="st-app-link search" title="Searh" ><Icon>search</Icon></Link>
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

  getData() {
    this.setState({loading: true})
    fetch('https://api.supertutortv.com/v2/courses/data', {
      headers: {
        'Authorization': 'Bearer ' + this.state.token,
        'Content-Type': 'application/json'
      }
      })
    .then( result => result.json())
    .catch(error => {
      console.log(error)
      this.setState({
        loading: false,
        flag: 'Error getting course data'
      })})
    .then( items => {
      localStorage.setItem('sttv_data', JSON.stringify(items.data))
      this.setState({
        courses : items.data.courses,
        loading: false,
        user : items.data.user
       })
      })
  }

  logout() {
      localStorage.removeItem('sttv_token')
      localStorage.removeItem('data')
      this.setState({auth : false,
                     courses : {},
                     flag : 'You have successfully logged out',
                     pw : '',
                     token : '',
                     user : ''
                   })
  }

  // This is a placeholder and will likely stay that way; real authentication
  // should take place through the main supertutortv login page
  getToken() {
    fetch('https://api.supertutortv.com/v2/auth/token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: this.state.user,
      password: this.state.pw,
      })
    })
    .then( result => result.json())
    .catch(error => {
      this.setState({token: '', course_data: {}, auth: false, flag: 'Unauthorized login request. This may be due to a high volume of requests from your location.'})
      console.log(error)
      })
    .then( items => {
      try{
        if (items.code == 'login_success'){
          localStorage.setItem('sttv_token', JSON.stringify(items.token))
          this.setState({token : items.token, loading: false, auth: true})
        }
        else if (items.code == 'rate_limit_exceeded'){
          this.setState({'flag': 'Too many login attempts. Please try again later', auth: false, loading: false})
        }
        else {
          this.setState({'flag': 'Incorrect username or password', auth: false, loading: false})
        }
      }
      catch (e) {}
      })
    }

    verifyToken(token) {
      fetch('https://api.supertutortv.com/v2/auth/token/verify', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        }
      })
      .then( result => result.json())
      .catch(error => {
        console.log(error)
        localStorage.removeItem('sttv_token')
        this.setState({
          auth: false,
          data: {},
          flag: 'Your session has expired. Please log in again.',
          loading: false,
          token: ''
        })
      })
      .then( items => {
        if (items.code == 'rate_limit_exceeded'){
          this.setState({
            auth: false,
            flag: 'Unauthorized login request. This may be due to a high volume of requests from your location.',
            loading: false
          })
        }
        else if (items.code != 'token_verified') {
          localStorage.removeItem('data')
          localStorage.removeItem('sttv_token')
          this.setState({
            auth: false,
            data: {},
            loading: false
          })
        }
        else {
          this.setState({auth: true, token: items.token})
          this.getData()
        }
      })
    }

  Login() {
    return (
      <div id="sttv_login_form" type="POST">
  		<p className="message"></p>
  		<div className="row">
  			<div className="input-field s12">
  				<input type="text" name="user" id="sttv_user" minLength="4" value={this.state.user} onChange={this.handleChange}/>
  				<label data-error="Must be at least 4 characters" data-success="Good job!">Username</label>
  			</div>
  			<div className="input-field s12">
  				<input type="password" name="pw" id="sttv_pass" value={this.state.pw} onChange={this.handleChange}/>
  				<label className="">Password</label>
  			</div>
  		</div>
  		<button type="submit" className="z-depth-1" id="login-btn" onClick={() => this.getToken()}>Login</button>
      </div>
    )}

  // Wrapper for the stage and the recursive rendering function
  Courses() {
    if (this.state.courses == null && this.state.auth & !this.state.flag){
      console.log(this.state.courses)
      // This is currently dangerous
      this.getData()
    }
    let link = '/courses/' + this.state.currentCourse
    return (
      <div>
        {this.makeStage()}
        {this.setUpSections(this.state.courses[this.state.currentCourse].sections, link, this.state.courses[this.state.currentCourse].thumbUrls.plain, 0)}
      </div>)
    }

  // Links and routes for individual videos
  setUpVids(vids, linkTo, thumbUrl) {
    let videos = []
    for (let vid in vids) {
      let video = vids[vid]
      console.log(video)
      let link = linkTo + '/' + video.slug
      let thumb = thumbUrl.replace('||ID||', video.thumb)
      let ref = cleanup(linkTo.slice(1)).concat(' >')
      videos.push(
        <div key={video.slug} className="st-video-card">
          <Link to={link} onClick={() => this.updateStage(video.ID)}>
            <div className="st-video-card">
              <div>
                  <img src={thumb} className="z-depth-3"/>
              </div>
              <span className="st-video-card-title"> {ref} {video.name}</span>
            </div>
          </Link>
          <div path={link} />
        </div>
        )
      }
    return ( videos )
    }

  // Updates the contents of the video stage, triggering a re-render
  updateStage(id) {
    id = String(id)
    this.setState({'stage' : id})
    }

  // Makes the video stage
  makeStage() {
    if (this.state.stage === '-1'){
      return
    }
    if (this.state.stage === '0') {
      return ('This video will become available when you purchase the full course')
    }
    else {
      let link = this.vimeoLink.replace('||ID||', this.state.stage)
      return (
        <iframe className="sttv-course-player"
          key='stage'
          src={link}
          width="946" height="594" frameBorder="" title="Intro" webkitallowfullscreen="tr"
          allowFullScreen=""></iframe>
        )
      }
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
          route =
          <div>
            <Route path={link} />
            {this.setUpSections(sections[section].subsec, link,  thumb, spacing+1)}
          </div>
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
      return ( renderedSections )
    }

  // Calls the menu and the page components; menu has the links that these routes
  // pick up on, which determines whether or not they are rendered
  render() {
    if (this.state.auth) {
      return (
        <BrowserRouter>
          <div>
              <this.Menu/>
              <section id="st-app">
                <Route path="/" component={this.Header}/>
                <section id="st-app-inner">
                  <Switch>
                    <Route className="st-link" path="/dashboard" component={this.Dashboard}/>
                    <Route className="st-link" path="/courses" component={this.Courses}/>
                    <Route className="st-link" path="/history" component={this.History}/>
                    <Route className="st-link" path="/feedback" component={this.Feedback}/>
                    <Route className="st-link" path="/bookmarks" component={this.Bookmarks}/>
                    <Route className="st-link" path="/review" component={this.Review}/>
                    <Route className="st-link" path="/downloads" component={this.Downloads}/>
                    <Route className="st-link" path="/help" component={this.Help}/>
                    <Redirect to="/dashboard"/>
                  </Switch>
                </section>
              </section>
          </div>
        </BrowserRouter>
      )}
    else if (!this.state.loading) {
      const message = <span>{this.state.flag}</span>
      return (
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
      return ('Loading')
    }
      }
    }

// Export the whole thing
ReactDOM.render (
    <App />,
  document.getElementById("app"));
