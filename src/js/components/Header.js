import React from 'react'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <header id="stAppHeader" className="row z-depth-1">
                <img src={_st.root+'/assets/img/sttv_logo.png'} />
            </header>
        )
    }
}