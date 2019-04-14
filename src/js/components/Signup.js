import React from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'
import Header from './Header'
import * as methods from './signup/methods'
import * as steps from './signup/steps'
import model from './signup/model'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            ...model,
            plan: this.props.match.params.plan || null,
            session: {
                id: Date.now(),
                signature: btoa(navigator.userAgent+'|'+navigator.platform+'|'+navigator.product).replace(/=/g,'')
            }
        }

        Object.keys(methods).forEach((method) => {
            this[method] = methods[method].bind(this)
        })

        this.plans = [
            'sat',
            'act',
            'combo'
        ]

        this.steps = [
            'Account',
            'Payment',
            'ThankYou'
        ]

        _st.bodyClass = 'signup'
    }

    componentDidMount() {
        _st.loading = false
        /* let {plan} = this.props.match.params
        _st.http.get('/signup/'+plan,(d) => {
            console.log(d.data)
            this.setState({init: true, item: d.data}, () => {})
        }) */
    }

    componentDidUpdate() {
        _st.loading = false
    }

    componentWillUnmount() {
        let el = document.getElementById('stStripeScript')
        el.parentNode.removeChild(el)
    }

    componentWillReceiveProps(nextProps) {
        var { history: hist } = nextProps
        if (hist.action === 'POP') this.setState(this.props.location.state)
    }

    shouldComponentUpdate() {
        return this.state.update
    }

    render() {
        console.log(this.state.plan)
        /* if (typeof plan === 'undefined' || this.plans.indexOf(plan) < 0 ) {
            this.props.history.replace('/login')
            return null 
        } */

        //if (this.state.init === false) return null

        const Checkout = steps[this.steps[this.state.step]]
        return(
            <StripeProvider apiKey={_st.stripe}>
                <React.Fragment>
                    <Elements>
                        <Checkout 
                            hist={this.props.history}
                            state={this.state} 
                            error={this.state.error} 
                            changeStep={this.changeStep} 
                            createAccount={this.createAccount} 
                            calculatePricing={this.calculatePricing} 
                            updateInp={this.updateInp} 
                            updatePrice={this.updatePrice} 
                            setChecker={this.setChecker} 
                            setOutcome={this.setOutcome} 
                            setPlan={this.setPlan} 
                            setShipping={this.setShipping} 
                            toPrice={this.toPrice} 
                            submitPayment={this.submitPayment} 
                            validate={this.validate}
                        />
                    </Elements>
                </React.Fragment>
            </StripeProvider>
        )
    }
}