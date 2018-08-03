import React from 'react';
import {Link, Route, Switch} from 'react-router-dom'

// Header that goes at the top of the app; contains routes to display page titles
// as well as the Dark Mode and Autoplay switches. Always gets rendered.
function Header(props) {
  const base = props.location.pathname.split('/').filter(String)
  let image
  if (this.state.matrixMode) {
    image =
    <div style={{top: '-10px', position: 'relative'}}>
      <h5>
        supertutortv
        <div style={{paddingLeft: '87px', fontSize: '130%'}}>
          &#x25CB;&#x25CB;&#x25CB;&#x25CB;&#x25CB;
        </div>
      </h5>
    </div>
  }
  else if (this.state.user.settings.dark_mode) {
    image = <img src={window.location.origin + "/assets/img/sttv_logo_contrast.png"}/>
  }
  else {
    image = <img src={window.location.origin + "/assets/img/sttv_logo.png"} alt="SupertutorTV"/>
  }
  return(
    <header>
        <div id="st-header-inner">
          <div id="st-header-branding">
            {image}
          </div>
          <div id="st-header-view-title">
            <Switch>
              <Route className='st-link' path={'/' + this.state.currentCourse} component={() => <Link to={'/' + this.state.currentCourse}> {this.cleanup(this.state.currentCourse)}</Link>}/>
              <Route className='st-link' path='/dashboard' component={() => "Dashboard"}/>
              <Route className='st-link' path='/courses' component={() => "Courses"}/>
              <Route className='st-link' path='/history' component={() => "History"}/>
              <Route className='st-link' path='/feedback' component={() => "Feedback"}/>
              <Route className='st-link' path='/bookmarks' component={() => "Bookmarks"}/>
              <Route className='st-link' path='/review' component={() => "Review"}/>
              <Route className='st-link' path='/all-your-base-are-belong-to-us' component={() => "You have no chance to survive make your time"} />
              <Route path="/*" exact component={() => "Oops"}/>
            </Switch>
          </div>
          <div id="header-settings">
            <div className="switch setting" >
              <label className="setting">
                <h6>Autoplay</h6>
                <input type="checkbox" name="autoplay" checked={this.state.user.settings.autoplay} disabled={this.state.loading} onChange={(event) => {
                  this.nestedStateChange(['settings'], event)
                  this.updateUserObj('settings')}}/>
                <span className="lever"></span>
              </label>
            </div>
            <div className="switch setting" >
              <label className="setting">
                <h6>Dark Mode</h6>
                <input type="checkbox" name="dark_mode" checked={this.state.user.settings.dark_mode} disabled={this.state.loading} onChange={(event) => {
                  this.setState({matrixMode: false})
                  this.nestedStateChange(['settings'], event)
                  this.updateUserObj('settings')}}/>
                <span className="lever"></span>
              </label>
            </div>
          </div>
        </div>
    </header>
  )
}

export {Header}
