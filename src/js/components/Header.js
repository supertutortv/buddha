import React from 'react'
import PropTypes from 'prop-types'
import FAIco from './FAIco'

const Header = ({stripped, title, depth, hist, refreshData}) => {
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
                            {/* <li><FAIco title="Rate/Review" icon="star"/></li>
                            <li><FAIco title="Leave Feedback" icon="comment-alt"/></li> */}
                            <li onClick={(e) => {
                                let result = window.confirm("Reloading the application could break your access to any courses you've purchased. Are you sure you want to reload the application?")

                                return result ? refreshData() : null
                            }}><FAIco title="Refresh course" icon="sync-alt" /></li>
                        </React.Fragment>
                    }
                    <li><FAIco title="Help" icon="question" onClick={(e) => {
                        e.preventDefault()
                        window.open("https://supertutortv.zendesk.com")
                    }}/></li>
                    <li onClick={(e) => {
                        _st.loading = true
                        _st.http.post('/auth/logout',{},() => refreshData())
                    }}><FAIco title="Log out" icon="sign-out-alt"/></li>
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