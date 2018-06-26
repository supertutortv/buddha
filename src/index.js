import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route} from 'react-router-dom'
import {Icon} from 'react-materialize'
import styled from 'styled-components'

const StyledLink = styled(Link)`
    color: white;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;


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

// Class that controls the state and rendered components of the app
class App extends React.Component {
  constructor() {
      super()
      this.state = {courseData : {},
                    stage: '',
                    user : '',
                    pw : '',
                    auth : '',
                    page : 'home'}
      const authString = localStorage.getItem('auth')
      try {
        var auth = JSON.parse(authString)
        this.state.auth = auth
        }
      catch (e) {
        void(0)
        }
      const courseString = localStorage.getItem('course_data')
      try {
        var courseData = JSON.parse(courseString)
        this.state.courseData = courseData
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
              you think of the course, you can do that <StyledLink to='/review' onClick={() => this.setState({page : 'review'})} >here</StyledLink>.
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
          <small>Not to be confused with <StyledLink to='/feedback' onClick={() => this.setState({page : 'feedback'})} >feedback</StyledLink>,
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
        <StyledLink to="/dashboard" className="st-app-link dashboard" title="Dashboard" onClick={() => this.setState({page : 'dashboard'})} ><Icon>person</Icon></StyledLink>
        <StyledLink to="/courses" className="st-app-link my-courses" title="Courses" onClick={() => this.setState({page : 'courses'})} ><Icon>apps</Icon></StyledLink>
        <StyledLink to="/downloads" className="st-app-link downloads" title="Downloads" onClick={() => this.setState({page : 'downloads'})} ><Icon>cloud_download</Icon></StyledLink>
        <StyledLink to="/history" className="st-app-link history" title="Orders" onClick={() => this.setState({page : 'history'})} ><Icon>schedule</Icon></StyledLink>
        <StyledLink to="/bookmarks" className="st-app-link bookmarked" title="Bookmarks" onClick={() => this.setState({page : 'bookmarks'})} ><Icon>bookmark</Icon></StyledLink>
        <StyledLink to="/search" className="st-app-link search" title="Searh" onClick={() => this.setState({page : 'search'})} ><Icon>search</Icon></StyledLink>
        <a className="st-app-link divider">&nbsp;</a>
        <StyledLink to="/review" className="st-app-link rate-course" title="Review" onClick={() => this.setState({page : 'review'})} ><i className="material-icons">rate_review</i></StyledLink>
        <StyledLink to="/feedback" className="st-app-link feedback" title="Feedback" onClick={() => this.setState({page : 'feedback'})} ><i className="material-icons">send</i></StyledLink>
        <StyledLink to="/help" className="st-app-link help" title="Help" onClick={() => this.setState({page : 'help'})} ><i className="material-icons">help</i></StyledLink>
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
    fetch('https://api.supertutortv.com/json/courses/8')
    .then( result => result.json())
    .then( items => {
      localStorage.setItem('course_data', JSON.stringify(items))
      this.setState({courseData : items,
                    stage: items.intro})
                  })
    }

  logout() {
      localStorage.removeItem('auth')
      this.setState({auth : '',
                     user : '',
                     pw : ''})
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
  		<button type="submit" className="z-depth-1" id="login-btn" onClick={() => this.getAuth()}>Login</button>
      </div>
    )}

  // This is a placeholder and will likely stay that way; real authentication
  // should take place through the main supertutortv login page
  getAuth() {
    // fetch('SOME ENDPOINT', {
    // method: 'POST',
    // headers: {
    //   'Accept': 'application/json',
    //   'Content-Type': 'application/json',
    // },
    // body: JSON.stringify({
    //   user: this.state.user,
    //   pw: this.state.pw,
    //   })
    // })
    // .then( result => result.json())
    // .then( items => {try {
    //   localStorage.setItem('auth', JSON.stringify(items))
    //   this.setState({auth : items})
    // }
    // catch (e) {
    //   console.log('There was an error authenticating your login')
    // }})
    this.setState({auth : 'Seems right to me'})
    }

  // Wrapper for the stage and the recursive rendering function
  Courses() {
    return (
      <div>
        {this.makeStage()}
        {this.setUpSections(this.state.courseData.sections, '/courses')}
      </div>)
    }

  // Links and routes for individual videos
  setUpVids(vids, linkTo) {
    let videos = []
    for (let vid in vids) {
      let vid = vids[vid]
      let link = linkTo + '/' + vid.slug
      let thumb = this.state.courseData.thumbUrls.plain.replace('||ID||', vid.thumb)
      let ref = linkTo.slice(1).replace(/\//g,' > ').replace(/\b\w/g,(x)=>(x.toUpperCase())).replace(/-/g, ' ').concat(' >')
      let button
      if (this.state.page == 'bookmarks') {
        button = <a className="st-video-remover" onClick={() => console.log('remove this video from my bookmarks!')} ><i className="material-icons">highlight_off</i></a>
      }
      else if (this.state.page == 'history') {
        button = <a className="st-video-remover" onClick={() => console.log('remove this video from my history!')} ><i className="material-icons">highlight_off</i></a>
      }
      videos.push(
        <div key={vid.slug} className="st-video-card">
          <StyledLink to={link} onClick={() => this.updateStage(vid.ID)}>
            <div className="st-video-card">
              <div>
                  {button}
                  <img src={thumb} className="z-depth-3"/>
              </div>
              <span className="st-video-card-title"> {ref} {vid.name}</span>
            </div>
          <div path={link} />
         </StyledLink>
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
    if (this.state.stage == 0) {
      return ('This video will become available when you purchase the full course')
    }
    else {
      let link = this.vimeoLink.replace('||ID||', this.state.stage)
      return (
        <iframe className="sttv-course-player"
          key='stage'
          src={link}
          width="192" height="108" frameBorder="0" title="Intro" webkitallowfullscreen=""
          allowFullScreen=""></iframe>
        )
      }
    }

  // Function that recursively generates the routes and links for sections
  // until it gets to a video folder
  setUpSections(sections, topLink) {
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
          render={() => this.setUpSections(sections[section].subsec, link)}/>
        }
        else if ('subjects' in sections[section]) {
          route = <Route path={link}
          render={() => this.setUpSections(sections[section].subjects, link)}/>
        }
        else if ('videos' in sections[section]) {
          route = <Route path={link}
          render={() => (
            <div id='video-wrapper'>
              {this.setUpVids(sections[section].videos, link)}
            </div>)}/>
        }
        let click
        if ('intro' in sections[section]) {
          click = () => this.updateStage(sections[section].intro)
        }
        renderedSections.push(
          <div key={section}>
            <StyledLink to={link} onClick={click} render={render}> {name} </StyledLink>
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
    if (true) {
      if ( this.state.courseData !== null) {
        return (
          <BrowserRouter>
            <div>
                <this.Menu/>
                <section id="st-app">
                  <StyledLink to="/" onClick={() => this.setState({page : 'home'})} >
                    <Logo />
                  </StyledLink>
                  <section id="st-app-inner">
                    <Route className="st-link" path="/dashboard" component={this.Dashboard}/>
                    <Route className="st-link" path="/courses" component={this.Courses}/>
                    <Route className="st-link" path="/history" component={this.History}/>
                    <Route className="st-link" path="/feedback" component={this.Feedback}/>
                    <Route className="st-link" path="/bookmarks" component={this.Bookmarks}/>
                    <Route className="st-link" path="/review" component={this.Review}/>
                    <Route className="st-link" path="/downloads" component={this.Downloads}/>
                    <Route className="st-link" path="/help" component={this.Help}/>
                  </section>
                </section>
            </div>
          </BrowserRouter>
        )}
      else {
        this.getCourses()
        return
      }
    }
    else {
      // Eventually, this should redirect to www.supertutortv.com
      return (
        <section id="st-app">
          <BrowserRouter>
            <div>
              <StyledLink to="/" onClick={() => this.setState({page : 'home'})} >
              </StyledLink>
              <this.Login />
            </div>
          </BrowserRouter>
        </section>
        )}
      }
    }

// Export the whole thing
ReactDOM.render (
    <App />,
  document.getElementById("app"));
