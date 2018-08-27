import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import STStrippedWrapper from './STStrippedWrapper'
import initSession from './signup/initSession'
import * as steps from './signup/steps'
import * as _st from '../classes/st'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            init: false,
            step: 0,
            params: props.location.search ? _st.objectifyURLParams(props.location.search) : {}
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
    }

    componentWillUnmount() {
        _st.bodyClass('signup')
    }

    componentDidMount() {
        _st.bodyClass('signup')
    }

    render() {
        return(
            <STStrippedWrapper>
                <form id="stSignupWrapper" className="stFormWrapper row" onSubmit={this.submit}>
                    <div className="stOverlay"></div>
                    <Switch>
                        <Route path='/signup/thankyou' component={this.thankyou} />
                        <Route path='/signup/*' render={() => <Redirect to='/notfound' />}/>
                        <Route exact path='/signup' render={(d) => {
                            
                            if (('plan' in this.state.params)&&!this.state.init)
                                return this.initSession(this.state.params['plan'])
                            else
                                return this[this.steps[this.state.step]]()
                        }} />
                    </Switch>
                    {_st.form.overlay()}
                </form>
            </STStrippedWrapper>
        )
    }
}