import React from 'react'

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state.sidebar = true
    }

    render() {
        return(
            <section id="stAppSidebar">Sidebar</section>
        )
    }
    
}