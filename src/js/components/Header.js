import React from 'react'
import PropTypes from 'prop-types'
import FAIco from './FAIco'

const Header = ({depth, hist}) => {
    return(
        <header id="stAppHeader" className={"row z-depth-"+depth}>
            <div id="stHeaderLeft" className="col s12 m2 hide-on-small-only"><img src={_st.root+'/assets/img/sttv_logo.png'} /></div>
            <div id="stHeaderMiddle" className="col s12 m8"></div>
            <div id="stHeaderRight" className="col s12 m2">
                <ul className="stNavContainer">
                    <li><a href="http://support.supertutortv.com" target="blank"><i className="brainy-question-mark"></i></a></li>
                    <li><a href="#" onClick={(e) => {
                        e.preventDefault()
                        hist.push('/dashboard')
                    }} ><FAIco icon="user" /></a></li>
                </ul>
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