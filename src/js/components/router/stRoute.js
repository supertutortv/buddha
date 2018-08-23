import React, {Component} from 'react'
import {Route} from 'react-router-dom'

export default class STRoute extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {component, ...rest} = this.props
        const STComp = component
        return (
            <Route {...rest} render={rtProps => {
                return (
                    <STComp {...rtProps} {...rest}/>
                )
            }} />
        )
    }
}
