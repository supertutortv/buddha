import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import STStrippedWrapper from './STStrippedWrapper'
import * as steps from './signup/steps'
import * as _st from '../classes/st'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            init: false
        }

        this.steps = [
            this.plans.bind(this),
            this.account.bind(this)
        ]

        this.renderStep = this.renderStep.bind(this)
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
        return null
    }

    componentWillUnmount() {
        _st.bodyClass('signup')
    }

    componentDidMount() {
        _st.bodyClass('signup')
        this.setState({
            init: true
        })
    }

    renderStep() {
        console.log(this.steps)
        return <Redirect to="/signup/billing" />
    }

    render() {
        if (!this.state.init) return null
        return(
            <STStrippedWrapper>
                <Switch>
                    <Route path='/signup/:step' component={this.renderStep} />
                    <Route exact path='/signup' render={(d) => {return this.plans(d)}} />
                </Switch>
            </STStrippedWrapper>
        )
    }
}