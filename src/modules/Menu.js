import React from 'react'
import {Icon} from 'react-materialize'
import {Link} from 'react-router-dom'

// Menu component. Contains links which render different components and become
// highlighted when they are activated.
function Menu(props) {
  const root = props.location.pathname.split('/').filter(String)[0]
  return(
    <section id="st-sidebar" style={this.state.search ? {pointerEvents : 'none'} : {pointerEvents: 'auto'}} >
      <Link to='/dashboard' className={root == 'dashboard' && !this.state.search ? 'st-link-active' : 'st-app-link'} title='Dashboard' ><Icon>person</Icon></Link>
      <Link to={!(root in this.state.courses) && this.state.lastLink ? this.state.lastLink : '/courses'} className={(root in this.state.courses || root == 'courses') && !this.state.search ? 'st-link-active' : 'st-app-link'} title='Courses' ><Icon>apps</Icon></Link>
      <Link to='/history' className={root == 'history' && !this.state.search ? 'st-link-active' : 'st-app-link'} title='History' ><Icon>schedule</Icon></Link>
      <Link to='/bookmarks' className={root == 'bookmarks' && !this.state.search ? 'st-link-active' : 'st-app-link'} title='Bookmarks' ><Icon>bookmark</Icon></Link>
      <a onClick={() => this.setState({search: !this.state.search})} className={this.state.search ? 'st-link-active' : 'st-app-link'} title='Search' ><Icon>search</Icon></a>
      <a className="st-app-link divider">&nbsp;</a>
      <Link to='/help' className={root == 'help' && !this.state.search ? 'st-link-active' : 'st-app-link'} title='Help' ><Icon>help</Icon></Link>
      <a onClick={this.courseRefresh} className='st-app-link' title='Refresh'><Icon>refresh</Icon></a>
      <a onClick={this.logout} className='st-app-link' title='Logout'><Icon>exit_to_app</Icon></a>
    </section>
  )
}

export {Menu}
