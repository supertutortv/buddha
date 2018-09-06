import React from 'react'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let depth = this.props.shadow || "3"
        return(
            <header id="stAppHeader" className={"row z-depth-"+depth}>
                <div id="stHeaderLeft" className="col s12 m2 hide-on-small-only"></div>
                <div id="stHeaderMiddle" className="col s12 m8">
                    <img src={_st.root+'/assets/img/sttv_logo.png'} />
                </div>
                <div id="stHeaderRight" className="col s12 m2"></div>
            </header>
        )
    }
}