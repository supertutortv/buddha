import React from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'
import * as methods from './signup/methods'

export default class Checkout extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            init: false,
            step: 0,
            update: true,
            loading: true,
            plan: this.props.match.params || null,
            error: {
                id: '',
                message: ''
            },
            card: false,
            valid: false,
            stripe: null,
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
                token: '',
                nameOnCard: ''
            },
            pricing: {
                total: 0,
                shipping: 0,
                coupon: {
                    id: '',
                    value: ''
                }
            },
            item: null,
            session: {
                id: Date.now(),
                signature: btoa(navigator.userAgent+'|'+navigator.platform+'|'+navigator.product).replace(/=/g,'')
            }
        }

        Object.keys(methods).forEach((method) => {
            this[method] = methods[method].bind(this)
        })

        //this.createStripeScript()
    }

    componentWillUnmount() {
        let el = document.getElementById('stStripeScript')
        if (el) el.parentNode.removeChild(el)
    }

    render() {
        return(
            <StripeProvider stripe={this.state.stripe}>
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
                    <footer>
                        <div>© {thedate.getFullYear()} Supertutor Media, Inc.</div>
                    </footer>
                </React.Fragment>
            </StripeProvider>
        )
    }
}