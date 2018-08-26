import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import STStrippedWrapper from './STStrippedWrapper'
import * as steps from './signup/steps'
import * as _st from '../classes/st'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.init = false
        this.state = {}
    }

    componentWillUnmount() {
        _st.bodyClass('signup')
    }

    componentDidMount() {
        _st.bodyClass('signup')
    }

    renderStep(d) {
        return (<div>Step</div>)
    }

    render() {
        return(
            <STStrippedWrapper>
                <Switch>
                    <Route path='/signup/:step' render={(d) => (typeof steps[d.match.params.step] !== 'undefined') ? steps[d.match.params.step](d) : <Redirect to='/error' /> } />
                    <Route exact path='/signup' render={(d) => {return steps.plans(d)}} />
                </Switch>
            </STStrippedWrapper>
        )
    }
}