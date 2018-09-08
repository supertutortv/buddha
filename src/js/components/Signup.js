import React from 'react'
import { StripeProvider } from 'react-stripe-elements'
import Header from './Header'
import * as methods from './signup/methods'
import * as steps from './signup/steps'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            update: true,
            loading: true,
            init: false,
            step: 0,
            plan: {},
            error : {
                id : '',
                message : ''
            },
            stripe : null,
            session: {
                valid: false,
                id: Date.now(),
                signature: btoa(navigator.userAgent+'|'+navigator.platform+'|'+navigator.product).replace(/=/g,''),
                card : {
                    valid : false,
                    obj : null
                },
                customer : {
                    account : {
                        email: '',
                        firstname: '',
                        lastname: '',
                        password: ''
                    },
                    shipping : {},
                    token: ''
                },
                pricing : {
                    total : 0,
                    shipping : 0,
                    taxable : 0,
                    tax : {
                        id: '',
                        value: 0
                    },
                    coupon : {
                        id: '',
                        value: ''
                    }
                }
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
        if (typeof window.Stripe === 'undefined') {
            const script = document.createElement("script")
            script.id = 'stStripeScript'
            script.src = "https://js.stripe.com/v3/"
            script.async = true
            document.body.appendChild(script)
        }
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
        return(
            <StripeProvider stripe={this.state.stripe}>
                <React.Fragment>
                    <Header shadow="0"/>
                    <div id="stSignupDiagSep" className="row">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#ffffff" width="100%" height="100px" viewBox="0 0 1920 100" preserveAspectRatio="none">
                            <polygon points="0,0 0,100 1920,0 "></polygon>
                        </svg>
                    </div>
                    <SignupStep 
                        error={this.state.error} 
                        setPlan={this.setPlan} 
                        changeStep={this.changeStep} 
                        createAccount={this.createAccount} 
                        updateInp={this.updateInp} 
                        initPayment={this.initPayment} 
                    />
                </React.Fragment>
            </StripeProvider>
        )
    }
}