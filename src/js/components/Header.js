import React from 'react'
import PropTypes from 'prop-types'
import FAIco from './FAIco'

const Header = ({title, depth, hist}) => {
    return(
        <header className={"stAppHeader z-depth-"+depth}>
            <div className="stHeaderLeft"><img src={_st.root+'/assets/img/sttv_logo.png'} /></div>
            <div className="stHeaderMiddle"><h1>{title}</h1></div>
            <div className="stHeaderRight">
                <ul className="stNavContainer">
                    <li><FAIco alt="Dashboard" icon="user" onClick={(e) => {
                        e.preventDefault()
                        hist.push('/dashboard')
                    }} /></li>
                    <li><FAIco alt="Help" icon="question" onClick={(e) => {
                        e.preventDefault()
                        window.open("http://support.supertutortv.com")
                    }}/></li>
                    <li><FAIco alt="Refresh course" icon="sync-alt" /></li>
                    <li><FAIco alt="Sign out" icon="sign-out-alt" /></li>
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