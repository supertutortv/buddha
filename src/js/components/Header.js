import React from 'react'
import PropTypes from 'prop-types'
import FAIco from './FAIco'

const Header = ({stripped, title, depth, hist}) => {
    var strCls = stripped ? ' stripped' : '',
        path = stripped ? '/login' : '/dashboard'
    return(
        <header className={"stAppHeader z-depth-"+depth+strCls}>
            <div className="stHeaderLeft">
                {stripped ? '' : <img src={_st.root+'/assets/img/sttv_logo.png'} />}
            </div>
            <div className="stHeaderMiddle">
                {stripped ? <img src={_st.root+'/assets/img/sttv_logo.png'} /> : <h1>{title}</h1>}
            </div>
            <div className="stHeaderRight">
                <ul className="stNavContainer">
                    <li><FAIco title="Help" icon="question" onClick={(e) => {
                        e.preventDefault()
                        window.open("http://support.supertutortv.com")
                    }}/></li>
                    <li><FAIco title={stripped ? "Login" : "Dashboard"} icon="user" onClick={(e) => {
                        e.preventDefault()
                        hist.push(path)
                    }} /></li>
                    {stripped ? '' :
                        <React.Fragment>
                            <li><FAIco title="Refresh course" icon="sync-alt" /></li>
                            <li><FAIco title="Sign out" icon="sign-out-alt" /></li>
                        </React.Fragment>
                    }
                </ul>
            </div>
        </header>
    )
}

Header.propTypes = {
    stripped: PropTypes.bool.isRequired
}

Header.defaultProps = {
    stripped: false,
    depth: '3'
}

export default Header