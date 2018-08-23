import React, {Component} from 'react'
import {Route} from 'react-router-dom'

export default class stRoute extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }

    renderMergedProps() {

    }

    render() {
        return (
            <Route {...this.props} />
        )
    }
}