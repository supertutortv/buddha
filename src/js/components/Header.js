import React from 'react'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <header id="stAppHeader" className="row z-depth-3">
                <div id="stHeaderLeft" className="col s12 m2"></div>
                <div id="stHeaderMiddle" className="col s12 m8">
                    <img src={_st.root+'/assets/img/sttv_logo.png'} />
                </div>
                <div id="stHeaderRight" className="col s12 m2"></div>
            </header>
        )
    }
}