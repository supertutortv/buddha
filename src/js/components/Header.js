import React from 'react'
import PropTypes from 'prop-types'
import LogoSVG from './LogoSVG'

const Header = ({stripped, title, depth, hist, refreshData}) => {
    var strCls = stripped ? ' stripped' : '',
        path = stripped ? '/login' : '/dashboard'
    return(
        <header className={"stAppHeader z-depth-"+depth+strCls}>
            <div className="stHeaderLeft">
                {stripped ? '' : <LogoSVG/>}
            </div>
            <div className="stHeaderMiddle">
                {stripped ? <LogoSVG/> : <h1>{title}</h1>}
            </div>
            <div className="stHeaderRight">
                <ul className="stNavContainer">
                    {stripped ? '' :
                        <React.Fragment>
                            <li title="Dashboard" onClick={(e) => {
                                hist.push('/')
                                return false
                            }}><i className="fas fa-home" ></i></li>
                            {/* <li title="Rate/Review"><i className="fas fa-star"></i></li>
                            <li title="Leave Feedback"><i className="fas fa-comment-alt"></i></li> */}
                            <li title="Reload"><i className="fas fa-sync-alt" onClick={(e) => {
                                let result = window.confirm("Are you sure you want to reload all application data?")

                                return result ? refreshData(true) : null
                            }}/></li>
                        </React.Fragment>
                    }
                    <li title="Help" onClick={(e) => {
                        e.preventDefault()
                        window.open("https://supertutortv.zendesk.com")
                    }}><i className="fas fa-question"></i></li>
                    <li title={stripped ? "Log in" : "Log out"} onClick={(e) => {
                        _st.loading = true
                        _st.http.post('/auth/logout',{},() => refreshData(true))
                    }}><i className={stripped ? "fas fa-sign-out-alt" : "fas fa-sign-in-alt"}></i></li>
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