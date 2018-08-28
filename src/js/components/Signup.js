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
            '',
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

    changeStep(inc = true) {
        this.setState({
            step : inc ? this.state.step + 1 : this.state.step - 1
        },() => {
            let path = this.state.step ? '/'+this.steps[this.state.step] : ''
            this.props.history.push('/signup'+path)
        })
    }

    shouldComponentUpdate(nprops,nstate) {
        return (this.state.session.customer === nstate.session.customer)
    }

    updateInp(e) {
        var el = e.target
        this.setState(prev => {
            var params = el.name.split('|'),
                newObj = {[params[0]] : {...prev.session[params[0]]}}

                params.reduce((obj,key,i,arr) => {
                    if (i+1 === arr.length) obj[key] = el.value
                    else return obj[key]
                },newObj)
            
            return Object.assign(prev.session[params[0]],newObj)
        })
    }

    renderStep(d) {
        if (typeof d.match.params.step !== 'undefined' && d.match.params.step === this.steps[this.state.step]) return this[this.steps[this.state.step]]()

        if (('plan' in this.state.params)&&!this.state.init) return this.initSession(this.state.params['plan'])

        return this.plans()
    }

    render() {
        return(
            <STStrippedWrapper error={this.state.error}>
                <form id="stSignupWrapper" className="stFormWrapper row" onSubmit={this.submit}>
                    <div className="stOverlay"></div>
                    <Switch>
                        <Route exact path='/signup/:step?' render={d => this.renderStep(d) } />
                    </Switch>
                </form>
            </STStrippedWrapper>
        )
    }
}