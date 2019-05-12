import React from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'
import * as methods from './signup/methods'
import * as steps from './signup/steps'

const thedate = new Date

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            init: false,
            step: 0,
            update: true,
            loading: true,
            plan: null,
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

        Object.keys(methods).forEach((method) => {
            this[method] = methods[method].bind(this)
        })

        this.createStripeScript()

        _st.bodyClass = 'signup'
    }

    componentDidMount() {
        let {plan} = this.props.match.params,
            key = _st.stripe
            
        _st.http.get('/signup/'+plan,(d) => {
            console.log(d.data)
            this.setState({
                init: true,
                item: d.data,
                stripe: (window.Stripe) ? window.Stripe(key) : null
            }, () => {
                if (!window.Stripe) document.querySelector('#stStripeScript').addEventListener('load', () => {
                    this.setState({stripe: window.Stripe(key)})
                })
                _st.loading = false
            })
        })
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
        let {plan} = this.props.match.params

        console.log(plan)

        if (typeof plan === 'undefined' || this.plans.indexOf(plan) < 0 ) {
            this.props.history.replace('/login')
            return null 
        }

        if (this.state.init === false) return null

        const Checkout = steps[this.steps[this.state.step]]
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