import React from 'react';
import {Route, Switch} from 'react-router-dom'

// Header that goes at the top of the app; contains routes to display the page title
function Header(props) {
  const base = props.location.pathname.split('/').filter(String)
  return(
    <header>
        <div id="st-header-inner">
          <div id="st-header-branding">
            <img src="https://supertutortv.com/wp-content/uploads/2016/10/sttv_site_logo.png" alt="SupertutorTV"/>
          </div>
          <div id="st-header-view-title">
            <Switch>
              <Route className='st-link' pvath={'/' + this.state.currentCourse} component={() => (this.cleanup(this.state.currentCourse))}/>
              <Route className='st-link' path='/dashboard' component={() => "Dashboard"}/>
              <Route className='st-link' path='/courses' component={() => "Courses"}/>
              <Route className='st-link' path='/history' component={() => "History"}/>
              <Route className='st-link' path='/feedback' component={() => "Feedback"}/>
              <Route className='st-link' path='/bookmarks' component={() => "Bookmarks"}/>
              <Route className='st-link' path='/review' component={() => "Review"}/>
              <Route className='st-link' path='/help' component={() => "Help"}/>
              <Route className='st-link' path='/all-your-base-are-belong-to-us' component={() => "You have no chance to survive make your time"} />
              <Route path="/*" exact component={() => "Oops"}/>
            </Switch>
          </div>
          <div id="dashboard-settings">
            <div>
              Dark Mode
              <input type="checkbox" label="Dark Mode" name="dark_mode" checked={this.state.user.settings.dark_mode}
                onChange={(event) => {
                  this.nestedStateChange(['settings'], event)
                  let newClass = this.state.user.settings.dark_mode ? 'dark-mode' : ''
                  this.updateUserObj()}}>
              </input>
            </div>
            <div>
              Autoplay
              <input type="checkbox" label="Autoplay" name="autoplay" checked={this.state.user.settings.autoplay}
                onChange={(event) => this.nestedStateChange(['settings'], event)}>
              </input>
            </div>
          </div>
        </div>
    </header>
  )
}

export {Header}
