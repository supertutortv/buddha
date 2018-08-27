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
            step: 0
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

        var prevSesh = localStorage.getItem('stSignupSesh')

        if (prevSesh !== null)
            this.state = JSON.parse(prevSesh)
    }

    plans() {
        return (
        <div id="step-2" class="stFormStep row">
            <div class="stFormHeader col s12">
                <h2>Select a plan.</h2>
                <span>All plans come with a 5 day free trial. <strong>NOTE:</strong> Your card will not be charged until your trial period is over, and you're free to cancel at any time. If your course comes with free books, they will not ship until your trial has expired.</span>
            </div>
            <div id="stSignupPlans" class="stFormBody col s12">{}</div>
        </div>
    )}

    account() {
        return <div>account</div>
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