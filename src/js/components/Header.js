import React from 'react'
import PropTypes from 'prop-types'
import {Switch,Route,Redirect,Link} from 'react-router-dom'

const CourseNav = () => {
    return (
    <ul>
        <li><a href="http://support.supertutortv.com" target="blank"><i className="brainy-question-mark"></i></a></li>
        <li><a href="#" onClick={(e) => {
            e.preventDefault()
            return (
                <Redirect push to="/dashboard" />
            )
        }} ><i className="brainy-pupil"></i></a></li>
    </ul>
    )
}

const Header = ({depth}) => {
    return(
        <header id="stAppHeader" className={"row z-depth-"+depth}>
            <div id="stHeaderLeft" className="col s12 m2 hide-on-small-only"><img src={_st.root+'/assets/img/sttv_logo.png'} /></div>
            <div id="stHeaderMiddle" className="col s12 m8"></div>
            <div id="stHeaderRight" className="col s12 m2">
                <CourseNav />
            </div>
        </header>
    )
}

Header.propTypes = {
    courseNav: PropTypes.bool.isRequired
}

Header.defaultProps = {
    courseNav: true,
    depth: '3'
}

export default Header