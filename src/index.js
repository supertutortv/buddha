import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch, Redirect} from 'react-router-dom'
import {Icon} from 'react-materialize'

// Header that goes at the top of the app
const Logo = () => (
        <header>
            <div id="st-header-inner">
              <div id="st-header-branding">
                <img src="https://supertutortv.com/wp-content/uploads/2016/10/sttv_site_logo.png" alt="SupertutorTV"/>
              </div>
              <div id="st-header-view-title">The Best ACT Prep Course Ever</div>
            </div>
        </header>
    )

const cleanup = (string) => (
  string.replace(/\//g,' > ').replace(/\b\w/g,(x)=>(x.toUpperCase())).replace(/-/g, ' ')
)

// Class that controls the state and rendered components of the app
class App extends React.Component {
  constructor() {
      super()
      this.verifyToken = this.verifyToken.bind(this)
      this.state = {courses : {},
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
        const courses = JSON.parse(localStorage.getItem('course_data'))
        if (courses !== null){
          this.state.courses = courses
        }
        else{
          this.state.loading = true
          this.state.token = ''
          this.state.auth = false
        }
      }
      catch (e) {
        void(0)
      }
      this.vimeoLink = 'https://player.vimeo.com/video/||ID||?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;autoplay=0'
      this.Dashboard = this.Dashboard.bind(this)
      this.History = this.History.bind(this)
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
      this.getCourses = this.getCourses.bind(this)
      this.handleChange = this.handleChange.bind(this)
    }

  // Renders the dashboard page
  Dashboard() {
    return (
      <div>Welcome to the Dashboard</div>
      )
    }

  History() {
    return (
      <div>Welcome to the History Page</div>
      )
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
    return (
      <div>Welcome to the Bookmarks Page</div>
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
        localStorage.removeItem('course_data')
        this.getCourses()
      }
    }

  getCourses() {
    fetch('https://api.supertutortv.com/v2/courses/data', {
      headers: {
        'Authorization': 'Bearer ' + this.state.token,
        'Content-Type': 'application/json'
      }
      })
    .then( result => result.json())
    .catch(error => {
      console.log(error)})
    .then( items => {
      if (items.code == 'user_course_data_success'){
      localStorage.setItem('course_data', JSON.stringify(items.data.courses))
      this.setState({courses : items.data.courses, loading: false})
      }
    })
  }

  logout() {
      localStorage.removeItem('sttv_token')
      localStorage.removeItem('course_data')
      this.setState({token : '',
                     user : '',
                     courses : {},
                     pw : '',
                     flag : 'You have successfully logged out',
                     auth : false})
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
        this.setState({token: '', course_data: {}, auth: false, flag: 'Unauthorized login request', loading: false})})
      .then( items => {
        if (items.code == 'rate_limit_exceeded'){
          this.setState({'flag': 'Too many login attempts. Please try again later', auth: false, loading: false})
        }
        else if (items.code != 'token_verified') {
          localStorage.removeItem('course_data')
          localStorage.removeItem('sttv_token')
          this.setState({auth: false, course_data: {}, loading: false})
        }
        else {
          this.setState({token: token, auth: true})
          this.getCourses()
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
    const courses = [<Route exact path='/courses' component={() => <h3>Your Courses:</h3>} key='your_courses'></Route>]
    for (let course in this.state.courses) {
      let link = '/courses/' + course
      courses.push(
        <div key={course}>
          <Route exact path={'/courses/'} component={() => <Link to={link}>{cleanup(course)}</Link>}>
          </Route>
          <Route path={'/courses/' + course} component={() => <h3>{cleanup(course)}</h3>}>
          </Route>
          <Route path={link} render={() => this.setUpSections(this.state.courses[course].sections, link, this.state.courses[course].thumbUrls.plain, false)} />
        </div>
        )
      }
    return (
      <div>
        {this.makeStage()}
        {courses}
      </div>)
    }

  // Links and routes for individual videos
  setUpVids(vids, linkTo, thumbUrl, deletable) {
    let videos = []
    for (let vid in vids) {
      let vid = vids[vid]
      let link = linkTo + '/' + vid.slug
      let thumb = thumbUrl.replace('||ID||', vid.thumb)
      let ref = cleanup(linkTo.slice(1)).concat(' >')
      let button
      if (deletable){
        button = <a className="st-video-remover" onClick={() => console.log('remove this video!')} ><i className="material-icons">highlight_off</i></a>
      }
      videos.push(
        <div key={vid.slug} className="st-video-card">
          <Link to={link} onClick={() => this.updateStage(vid.ID)}>
            <div className="st-video-card">
              <div>
                  {button}
                  <img src={thumb} className="z-depth-3"/>
              </div>
              <span className="st-video-card-title"> {ref} {vid.name}</span>
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
  setUpSections(sections, topLink, thumb, spacing, deletable) {
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
          render={() => this.setUpSections(sections[section].subsec, link,  thumb, spacing+1, deletable)}/>
        }
        else if ('subjects' in sections[section]) {
          route = <Route path={link}
          render={() => this.setUpSections(sections[section].subjects, link, thumb, spacing+1, deletable)}/>
        }
        else if ('videos' in sections[section]) {
          route = <Route path={link}
          render={() => (
            <div id='video-wrapper'>
              {this.setUpVids(sections[section].videos, link, thumb, deletable)}
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
                <Link to="/dashboard" >
                  <Logo />
                </Link>
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
