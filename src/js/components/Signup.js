import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import STStrippedWrapper from './STStrippedWrapper'
import createAccount from './signup/createAccount'
import initSession from './signup/initSession'
import { Plans, Account, Billing, Shipping, Pay, ThankYou } from './signup/steps'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            update: true,
            loading: true,
            init: false,
            step: 0,
            params: props.location.search ? _st.objectifyURLParams(props.location.search) : {},
            error : {
                id : '',
                message : ''
            }
        }
        this.steps = [
            'Plans',
            'Account',
            'Billing',
            'Shipping',
            'Pay',
            'ThankYou'
        ]

        this.initSession = initSession.bind(this)
        this.createAccount = createAccount.bind(this)
        this.renderStep = this.renderStep.bind(this)
        this.changeStep = this.changeStep.bind(this)
        this.updateInp = this.updateInp.bind(this)
    }

    componentDidUpdate() {
        _st.loading = false
    }

    componentDidMount() {
        _st.bodyClass = 'signup'
        _st.loading = false
    }

    changeStep(inc = true) {
        this.setState({
            step : inc ? this.state.step + 1 : this.state.step - 1
        })
    }

    shouldComponentUpdate() {
        return this.state.update 
    }

    updateInp({target: el}) {
        this.state.update = false
        this.setState(prev => {
            var params = el.name.split('|'),
                newObj = {[params[0]] : {...prev.session[params[0]]}}

                params.reduce((obj,key,i,arr) => {
                    if (i+1 === arr.length) obj[key] = el.value
                    else return obj[key]
                },newObj)
            return Object.assign(prev.session,newObj)
        },() => this.state.update = true)
    }

    renderStep() {
        if (('plan' in this.state.params)&&!this.state.init)
            return this.initSession(this.state.params['plan'])
        else {
            var Component = this.steps[this.state.step]
            console.log(this.steps[this.state.step])
            return <Component createAccount={this.createAccount} updateInp={this.updateInp} initSession={this.initSession} />
        }
    }

    render() {
        return(
            <STStrippedWrapper error={this.state.error}>
                <form id="stSignupWrapper" className="stFormWrapper row" onSubmit={_st.signup.pay}>
                    <div className="stOverlay"></div>
                    {this.renderStep()}
                </form>
            </STStrippedWrapper>
        )
    }
}