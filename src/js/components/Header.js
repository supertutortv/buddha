import React from 'react'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state.header = true
    }

    render() {
        return(
            <header id="stAppHeader">Header</header>
        )
    }
}