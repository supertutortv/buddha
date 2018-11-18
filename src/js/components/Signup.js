import React from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'
import Header from './Header'
import * as methods from './signup/methods'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            init: false,
            update: true,
            loading: true,
            plan: null,
            error: {
                id: '',
                message: ''
            },
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
                token: '',
                nameOnCard: ''
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
        this.plans = [
            'sat',
            'act',
            'combo'
        ]

        Object.keys(methods).forEach((method) => {
            this[method] = methods[method].bind(this)
        })

        _st.bodyClass = 'signup'
    }

    componentDidMount() {
        let {plan} = this.props.match.params
        _st.http.get('/signup/'+plan,(d) => {
            console.log(d)
            this.setState({init: true, plan: d.data}, () => _st.loading = false)
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

        if (typeof plan === 'undefined' || this.plans.indexOf(plan) < 0 ) {
            this.props.history.replace('/login')
            return null 
        }

        if (this.state.init === false) return null

        const Checkout = () => {}
        
        return(
            <StripeProvider apiKey={_st.stripe}>
                <React.Fragment>
                    <Header stripped={true} hist={this.props.history} />
                    <Elements>
                        <Checkout 
                            state={this.state} 
                            error={this.state.error} 
                            changeStep={this.changeStep} 
                            createAccount={this.createAccount} 
                            calculatePricing={this.calculatePricing} 
                            updateInp={this.updateInp} 
                            setChecker={this.setChecker} 
                            setOutcome={this.setOutcome} 
                            setPlan={this.setPlan} 
                            setShipping={this.setShipping} 
                            toPrice={this.toPrice} 
                            submitPayment={this.submitPayment} 
                            validate={this.validate}
                        />
                        <div>{JSON.stringify(this.state.plan)}</div>
                    </Elements>
                </React.Fragment>
            </StripeProvider>
        )
    }
}