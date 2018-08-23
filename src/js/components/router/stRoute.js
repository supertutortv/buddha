import React, {Component} from 'react'
import {Route} from 'react-router-dom'

export default class STRoute extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }

    renderMergedProps(component,...rest) {
        const final = Object.assign({},...rest)
        return (
            React.createElement(component, final)
        )
    }

    render() {
        return (
            <Route  />
        )
    }
}