import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import STStrippedWrapper from './STStrippedWrapper'
import * as steps from './signup/steps'
import * as _st from '../classes/st'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            init: false,
            step: 0,
            params: _st.objectifyURLParams(props.location.search)
        }
        this.steps = [
            '',
            'account',
            'billing',
            'pay',
            'shipping',
            'thankyou'
        ]

        this.renderStep = this.renderStep.bind(this)
        this.step = this.step.bind(this)
        this.plans = steps.plans.bind(this)
        this.account = steps.account.bind(this)
        this.billing = steps.billing.bind(this)
        this.shipping = steps.shipping.bind(this)
        this.pay = steps.pay.bind(this)
        this.thankyou = steps.thankyou.bind(this)
    }

    componentWillUnmount() {
        _st.bodyClass('signup')
    }

    componentDidMount() {
        _st.bodyClass('signup')
    }

    step(inc = 'plus') {
        return inc === 'plus' ? this.state.step++ : this.state.step--
    }

    renderStep(d) {
        if (this.steps[this.state.step] !== d.match.params.step)
            return <Redirect to="/signup" />
        else
            return this[this.steps[this.state.step]]()
    }

    render() {
        return(
            <STStrippedWrapper>
                <Switch>
                    <Route path='/signup/:step' render={(d) => this.renderStep(d)} />
                    <Route exact path='/signup' render={(d) =>  this.plans(d)} />
                </Switch>
            </STStrippedWrapper>
        )
    }
}