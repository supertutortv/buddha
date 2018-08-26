import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import STStrippedWrapper from './STStrippedWrapper'
import {Plans,Account,Billing,Shipping,Pay} from './signup/steps'
import * as _st from '../classes/st'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.init = false
        this.state = {}
        console.log(this.props)
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
                    <Route path='/signup/account' render={(d) => {return this.renderStep(d)}} />
                    <Route path='/signup/billing' render={(d) => {return this.renderStep(d)}} />
                    <Route path='/signup/shipping' render={(d) => {return this.renderStep(d)}} />
                    <Route path='/signup/pay' render={(d) => {return this.renderStep(d)}} />
                    <Route exact path='/signup' render={(d) => {return this.renderStep(d)}} />
                </Switch>
            </STStrippedWrapper>
        )
    }
}