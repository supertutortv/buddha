import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import STStrippedWrapper from './STStrippedWrapper'
import createAccount from './signup/createAccount'
import initSession from './signup/initSession'
import * as steps from './signup/steps'
import * as _st from '../classes/st'

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
            'plans',
            'account',
            'billing',
            'shipping',
            'pay',
            'thankyou'
        ]

        this.plans = steps.plans.bind(this)
        this.account = steps.account.bind(this)
        this.billing = steps.billing.bind(this)
        this.shipping = steps.shipping.bind(this)
        this.pay = steps.pay.bind(this)
        this.thankyou = steps.thankyou.bind(this)
        this.initSession = initSession.bind(this)
        this.createAccount = createAccount.bind(this)
        this.renderStep = this.renderStep.bind(this)
        this.changeStep = this.changeStep.bind(this)
        this.updateInp = this.updateInp.bind(this)
    }

    componentWillUnmount() {
        _st.bodyClass('signup')
    }

    componentDidMount() {
        _st.form.overlay()
        _st.bodyClass('signup')
    }
    
    componentDidUpdate() {
        this.state.update = true
    }

    changeStep(inc = true) {
        this.setState({
            step : inc ? this.state.step + 1 : this.state.step - 1
        })
    }

    shouldComponentUpdate() {
        return this.state.update 
    }

    updateInp(e) {
        this.state.update = false
        var el = e.target
        this.setState(prev => {
            var params = el.name.split('|'),
                newObj = {[params[0]] : {...prev.session[params[0]]}}

                params.reduce((obj,key,i,arr) => {
                    if (i+1 === arr.length) obj[key] = el.value
                    else return obj[key]
                },newObj)
            console.log(newObj)
            return Object.assign(prev.session,newObj)
        })
    }

    renderStep(d) {
        if (('plan' in this.state.params)&&!this.state.init) return this.initSession(this.state.params['plan'])

        return this[this.steps[this.state.step]]()
    }

    render() {
        console.log('rendered')
        return(
            <STStrippedWrapper error={this.state.error}>
                <div id="stSignupWrapper" className="stFormWrapper row">
                    <div className="stOverlay"></div>
                    {this.renderStep()}
                </div>
            </STStrippedWrapper>
        )
    }
}