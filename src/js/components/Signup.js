import React from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'
import Header from './Header'
import ErrorPage from './ErrorPage'
import * as methods from './signup/methods'
import * as steps from './signup/steps'
import model from './signup/model'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            ...model,
            plan: this.props.match.params.plan || null,
            stripe: null,
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
        let key = _st.stripe
        if (window.Stripe) {
            this.setState({stripe: window.Stripe(key)})
        } else {
            document.querySelector('#stStripeScript').addEventListener('load', () => {
                this.setState({stripe: window.Stripe(key)})
            })
        }
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
        let {plan,stripe} = this.state

        if (typeof plan === 'string' && this.plans.indexOf(plan) < 0 ) {
            return <ErrorPage/>
        }

        if (stripe === null)
            console.log('Stripe not loaded')
        else
            console.log(stripe)

        const Checkout = steps[this.steps[this.state.step]]

        return(
            <React.Fragment>
                <script id="stStripeScript" src="https://js.stripe.com/v3/"></script>
                <StripeProvider stripe={this.state.stripe}>
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
                </StripeProvider>
            </React.Fragment>
        )
    }
}