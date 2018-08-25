import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {GlobalState} from '../../utilities/StateContext'

export default class STRoute extends Component {
    render() {
        const {component, ...rest} = this.props
        const STComp = component
        return (
            <GlobalState.Consumer>
                {st => (
                    <Route {...rest} render={rtProps => {
                        return (
                            <STComp st={st} {...rtProps} {...rest}/>
                        )
                    }} />
                )}
            </GlobalState.Consumer>
        )
    }
}
