import React from 'react'
import PropTypes from 'prop-types'
import FAIco from './FAIco'

const Header = ({data, depth, hist}) => {
    console.log(data)
    return(
        <header id="stAppHeader" className={"row z-depth-"+depth}>
            <div id="stHeaderLeft" className="col s12 m2 hide-on-small-only"><img src={_st.root+'/assets/img/sttv_logo.png'} /></div>
            <div id="stHeaderMiddle" className="col s12 m8"></div>
            <div id="stHeaderRight" className="col s12 m2">
                <ul className="stNavContainer">
                    <li><FAIco icon="user" onClick={(e) => {
                        e.preventDefault()
                        hist.push('/dashboard')
                    }} /></li>
                    <li><FAIco icon="question" onClick={(e) => {
                        e.preventDefault()
                        window.open("http://support.supertutortv.com")
                    }}/></li>
                    <li><FAIco icon="sign-out-alt" /></li>
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