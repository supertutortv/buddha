import React, {Component} from 'react'
import {Route} from 'react-router-dom'

export default class STRoute extends Component {
    constructor(props) {
        super(props)
    }

    renderMergedProps() {

    }

    render() {
        return (
            <Route {...this.props} />
        )
    }
}