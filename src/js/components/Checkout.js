import React from 'react'
import { StripeProvider, Elements, CardElement } from 'react-stripe-elements'
import Buttons from './checkout/Buttons'
import * as methods from './signup/methods'
import * as steps from './signup/steps'

export default class Checkout extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            init: false,
            completed: false,
            step: 0,
            update: true,
            loading: true,
            plan: null,
            card: false,
            valid: false,
            stripe: null
        }

        this.state.error = {
            id: '',
            message: ''
        }

        this.state.customer = {
            uid: '',
            stripeid: '',
            account: {
                email: '',
                firstname: '',
                lastname: ''
            },
            shipping: {
                phone: '',
                name: '',
                address: {}
            },
            options: {},
            token: '',
            nameOnCard: ''
        }

        this.steps = [
            'Course',
            'Details',
            'Shipping',
            'Payment',
            'ThankYou'
        ]

        Object.keys(methods).forEach((method) => {
            this[method] = methods[method].bind(this)
        })
    }

    componentDidMount() {
        this.initSession()
        _st.loading = false
    }

    componentWillUnmount() {
        let el = document.getElementById('stStripeScript')
        if (el) el.parentNode.removeChild(el)
    }

    render() {
        if (!this.state.init) return null

        let {step, completed} = this.state,
            count = step + 1,
            Step = steps[this.steps[step]]

        return(
            <StripeProvider stripe={this.state.stripe}>
                <Elements>
                        <section className="stCheckoutWindow" onClick={(e) => e.stopPropagation()}>
                            <div className="stepSide">
                                <div><h1><i class="fas fa-lock"></i> Checkout</h1></div>
                                <div>{count}</div>
                            </div>
                            <div className="checkSide">
                                <form action="/" onSubmit={(e) => {
                                    e.preventDefault()
                                }}>
                                    <Step />
                                    <Buttons completed={completed} steps={this.steps.length} count={count} step={step}/>
                                </form>
                            </div>
                        </section>
                    {/* <CardElement onChange={(e)=>console.log(e, auth.plan)} /> */}
                </Elements>
            </StripeProvider>
        )
    }
}