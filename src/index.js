import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route} from 'react-router-dom'

const {Provider, Consumer} = React.createContext('url');


const Logo = () => (
    <div id="sttv-logo">
      <img src="https://supertutortv.com/wp-content/uploads/2016/10/sttv_site_logo.png"
      alt="SupertutorTV"/>
    </div>
    )

class App extends React.Component {
  constructor(){
    super()
    const courseString = localStorage.getItem('course_data')
    // This keeps the components from erroring before they can be re-rendered with proper data
    this.state = {
      courseData : {},
      stage : ''
    }
    try {
      var courseData = JSON.parse(courseString)
      if (courseData.lastFetched + 86400 < Date.now()) {
        this.state = {
          courseData: courseData,
          stage : courseData.intro
        }
      }
    }
    catch (e) {
      fetch('https://api.supertutortv.com/json/courses/8')
      .then( result => result.json())
      .then( items => {
        localStorage.setItem('course_data', JSON.stringify(items))
        this.setState({courseData : items,
                      stage: items.intro})
      })
    }
    this.Dashboard = this.Dashboard.bind(this)
    this.Orders = this.Orders.bind(this)
    this.Feedback = this.Feedback.bind(this)
    this.Review = this.Review.bind(this)
    this.Downloads = this.Downloads.bind(this)
    this.Help = this.Help.bind(this)
    this.Menu = this.Menu.bind(this)
    this.Courses = this.Courses.bind(this)
    this.courseRefresh = this.courseRefresh.bind(this)
    this.logout = this.logout.bind(this)
    this.renderVids = this.renderVids.bind(this)
    this.updateStage = this.updateStage.bind(this)
    this.makeStage = this.makeStage.bind(this)
    this.renderSections = this.renderSections.bind(this)
  }

  Dashboard() {
    return(<div>Welcome to the Dashboard</div>)
  }

  Orders() {
    return (<div>Welcome to the Orders Page</div>)
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
            you think of the course, you can do that <Link to='/review'>here</Link>.
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
      			<i className="mi material-icons">star</i>
      			<i className="mi material-icons">star</i>
      			<i className="mi material-icons">star</i>
      			<i className="mi material-icons">star</i>
      			<i className="mi material-icons">star</i>
      		</ul>
      	  </div>
      	  <div className="message-box">
      		<textarea placeholder="Enter your review here." id="review-content"></textarea>
      	  </div>
      	</section>
      	<p className="center-align">
          <small>Not to be confused with <Link to='/feedback'>feedback</Link>,
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

  Downloads() {
      return (
        <div>Welcome to the Downloads Page</div>
      )
    }

  Help() {
      return (
        <div>Welcome to the Help Page</div>
      )
    }

  Menu() {
    return(
      <div id="menu">
        <Link to="/dashboard" className='menu-item'>Dashboard</Link>
      <br/>
        <Link to="/courses" className='menu-item'>Courses</Link>
      <br/>
        <Link to="/orders" className='menu-item'>Orders</Link>
      <br/>
        <Link to="/feedback" className='menu-item'>Feedback</Link>
      <br/>
        <Link to="/review" className='menu-item'>Review</Link>
      <br/>
        <Link to="/downloads" className='menu-item'>Downloads</Link>
      <br/>
        <Link to="/help" className='menu-item'>Help</Link>
      <br/>
        <a onClick={this.courseRefresh} className='menu-item'>Refresh Courses</a>
      <br/>
        <a onClick={this.logout} className='menu-item'>Logout</a>
      </div>
    )
  }

  courseRefresh() {
      if (confirm('Only do this if advised by a technician at SupertutorTV, as access to your course could be broken or interrupted. Are you sure you want to proceed?')){
        localStorage.removeItem('course_data')
        fetch('https://api.supertutortv.com/json/courses/8')
        .then( result => result.json())
        .then( items => {
          localStorage.setItem('course_data', JSON.stringify(items))
          this.setState({courseData : items,
                        stage: items.intro})
        })
      }
    }

  logout(){
      console.log('This hasn\'t been set up yet')
    }

  Courses() {
    return(
      <div>
        {this.makeStage()}
        {this.renderSections(this.state.courseData.sections, '/courses')}
      </div>)
  }

  renderVids(vids, linkTo) {
        let videos = []
        for (let vid in vids){
          let vid = vids[vid]
          let link = linkTo + '/' + vid.slug
          videos.push(
            <div key={vid.slug}>
              <Link to={link} onClick={() => this.updateStage(vid.ID)}> {vid.name}
              <Consumer >
                {url => <img src={url.plain.replace('||ID||', vid.thumb)}/>}
              </Consumer>
              <div path={link} />
             </Link>
            </div>
          )
            }
        return( videos )
      }

    updateStage(id) {
      id = String(id)
      this.setState({'stage' : id})
    }

    makeStage() {
      if (this.state.stage == 0) {
        return ('This video will become available when you purchase the full course')
      }
      else {
        return (
          <iframe className="sttv-course-player"
            key='stage'
            src={'https://player.vimeo.com/video/||ID||?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;autoplay=0'.replace('||ID||', this.state.stage)}
            width="192" height="108" frameBorder="0" title="Intro" webkitallowfullscreen=""
            allowFullScreen=""></iframe>
        )
      }
    }

    renderSections(sections, topLink) {
      let renderedSections = []
      for (let section in sections){
        if (section !== 'type'){
          let name
          if ('name' in sections[section]){
            name = sections[section].name
          }
          else if ('title' in sections[section]){
            name = sections[section].title
          }
          let link = topLink + '/' + section
          let route
          if ('subsec' in sections[section]) {
            route = <Route path={link}
              render={() => this.renderSections(sections[section].subsec, link)}/>
          }
          else if ('subjects' in sections[section]) {
            route = <Route path={link}
              render={() => this.renderSections(sections[section].subjects, link)}/>
          }
          else if ('videos' in sections[section]) {
            route = <Route path={link}
              render={() => this.renderVids(sections[section].videos, link)}/>
          }
          let click
          if ('intro' in sections[section]) {
            click = () => this.updateStage(sections[section].intro)
          }
          renderedSections.push(
            <div key={section}>
              <Link to={link} onClick={click}> {name} </Link>
              {route}
            </div>
          )
      }
    }
      return( renderedSections )
    }

  render() {
  return (
    <BrowserRouter>
      <div>
        <Link to="/">
          <Logo/>
        </Link>
          <this.Menu/>
          <Provider value={this.state.courseData.thumbUrls}>
            <Route path="/dashboard" component={this.Dashboard}/>
            <Route path="/courses" component={this.Courses}/>
            <Route path="/orders" component={this.Orders}/>
            <Route path="/feedback" component={this.Feedback}/>
            <Route path="/review" component={this.Review}/>
            <Route path="/downloads" component={this.Downloads}/>
            <Route path="/help" component={this.Help}/>
          </Provider>
      </div>
    </BrowserRouter>
  )}
}

export default App;
