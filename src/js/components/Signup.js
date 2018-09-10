import React from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'
import Header from './Header'
import * as methods from './signup/methods'
import * as steps from './signup/steps'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            update: true,
            loading: true,
            step: 0,
            plan: null,
            error: {
                id: '',
                message: ''
            },
            stripe: null,
            card: false,
            valid: false,
            customer: {
                account: {
                    email: '',
                    firstname: '',
                    lastname: '',
                    password: ''
                },
                shipping: {
                    phone: '',
                    name: '',
                    address: {}
                },
                options: {},
                token: ''
            },
            pricing: {
                total: 0,
                shipping: 0,
                taxable: 0,
                tax: {
                    id: '',
                    value: 0
                },
                coupon: {
                    id: '',
                    value: ''
                }
            },
            items: [],
            session: {
                id: Date.now(),
                signature: btoa(navigator.userAgent+'|'+navigator.platform+'|'+navigator.product).replace(/=/g,'')
            }
        }
        this.steps = [
            'Plans',
            'Account',
            'Payment',
            'ThankYou'
        ]

        Object.keys(methods).forEach((method) => {
            this[method] = methods[method].bind(this)
        })

        _st.bodyClass = 'signup'
    }

    componentDidMount() {
        _st.loading = false
    }

    componentDidUpdate() {
        _st.loading = false
    }

    componentWillUnmount() {
        let el = document.getElementById('stStripeScript')
        el.parentNode.removeChild(el)
    }

    componentWillReceiveProps(nextProps) {
        var { history: hist} = nextProps
        if (hist.action === 'POP') this.setState(this.props.location.state)
    }

    shouldComponentUpdate() {
        return this.state.update
    }

    render() {
        let {step} = this.props.match.params
        if (typeof step === 'undefined' || step !== this.steps[this.state.step].toLowerCase()) {
            this.props.history.replace('/signup/plans')
            return null 
        }

        const SignupStep = steps[this.steps[this.state.step]]
        if (this.state.plan !== null) this.calculatePricing()
        return(
            <StripeProvider apiKey={_st.stripe}>
                <React.Fragment>
                    <Header shadow="0"/>
                    <div id="stSignupDiagSep" className="row">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#ffffff" width="100%" height="100px" viewBox="0 0 1920 100" preserveAspectRatio="none">
                            <polygon points="0,0 0,100 1920,0 "></polygon>
                        </svg>
                    </div>
                    <Elements>
                        <SignupStep 
                            error={this.state.error} 
                            setPlan={this.setPlan} 
                            changeStep={this.changeStep} 
                            createAccount={this.createAccount} 
                            updateInp={this.updateInp} 
                            initPayment={this.initPayment} 
                            state={this.state}
                        />
                    </Elements>
                </React.Fragment>
            </StripeProvider>
        )
    }
}