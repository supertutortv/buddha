import React from 'react'

export default class ST extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeClass : 'loading'
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.visible()
        },10000)
    }

    hidden() {
        this.setState({activeClass : 'loading'})
    }

    visible() {
        this.setState({activeClass : 'active'})
    }

    render() {
        return (
            <div id="stAppMain" className={this.state.activeClass}>Coming soon</div>
        )
    }
}