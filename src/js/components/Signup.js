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
        console.log(this.props.location)
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
                    <Route path='/signup/account' render={(d) => {return steps.account(d)}} />
                    <Route path='/signup/billing' render={(d) => {return steps.billing(d)}} />
                    <Route path='/signup/shipping' render={(d) => {return steps.shipping(d)}} />
                    <Route path='/signup/pay' render={(d) => {return steps.pay(d)}} />
                    <Route path='/signup/*' render={(d) => {return (<Redirect to='/error' />)}} />
                    <Route exact path='/signup' render={(d) => {return steps.plans(d)}} />
                </Switch>
            </STStrippedWrapper>
        )
    }
}