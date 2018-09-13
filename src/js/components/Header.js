import React from 'react'
import PropTypes from 'prop-types'

const Header = ({depth, courseNav}) => {
    return(
        <header id="stAppHeader" className={"row z-depth-"+depth}>
            <div id="stHeaderLeft" className="col s12 m2 hide-on-small-only"></div>
            <div id="stHeaderMiddle" className="col s12 m8">
                <img src={_st.root+'/assets/img/sttv_logo.png'} />
            </div>
            <div id="stHeaderRight" className="col s12 m2">
                {!courseNav || <div></div>}
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