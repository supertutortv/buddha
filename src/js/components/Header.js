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
                    {stripped ? '' :
                        <React.Fragment>
                            <li><FAIco title="Dashboard" icon="user" onClick={(e) => {
                                e.preventDefault()
                                hist.push('/dashboard')
                            }} /></li>
                            <li><FAIco title="Rate/Review" icon="star"/></li>
                            <li><FAIco title="Leave Feedback" icon="comment-alt"/></li>
                            <li><FAIco title="Refresh course" icon="sync-alt" /></li>
                        </React.Fragment>
                    }
                    <li><FAIco title="Help" icon="question" onClick={(e) => {
                        e.preventDefault()
                        window.open("http://support.supertutortv.com")
                    }}/></li>
                    <li><FAIco title={stripped ? "Log in" : "Log out"} icon={stripped ?"sign-out-alt" : "sign-in-alt"} /></li>
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