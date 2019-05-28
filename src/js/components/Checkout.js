import React from 'react'
import { StripeProvider, Elements, CardElement } from 'react-stripe-elements'
import Buttons from './checkout/Buttons'
import methods from './checkout/methods'
import * as steps from './checkout/steps'

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
            item: null,
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
        const key = _st.stripe
        this.session = {
            id: Date.now(),
            signature: btoa(navigator.userAgent+'|'+navigator.platform+'|'+navigator.product).replace(/=/g,'')
        }

        if (!window.Stripe) {
            const s = document.createElement('script')
            s.type = 'text/javascript'
            s.id = 'stStripeScript'
            s.async = true
            s.src = 'https://js.stripe.com/v3/'
            document.body.appendChild(s)
        }

        this.setState((state) => {
            let obj = {
                init: true,
                stripe: (window.Stripe) ? window.Stripe(key) : null
            },
            savedSU = JSON.parse(localStorage.getItem('_stT-signup'))

            if (savedSU) {
                obj.plan = savedSU.plan
                obj.customer = Object.assign(state.customer,{
                    uid: savedSU.id,
                    stripeid: savedSU.customer.id,
                    accoutn: Object.assign(state.customer.account,{
                        email: savedSU.email,
                        firstname: savedSU.firstname,
                        lastname: savedSU.lastname
                    })
                })
            }

            return obj
        }, () => {
            if (!window.Stripe) document.querySelector('#stStripeScript').addEventListener('load', () => {
                this.setState({stripe: window.Stripe(key)})
            })
        })
        _st.loading = false
    }

    shouldComponentUpdate(np, ns) {
        return ns.update;
      }

    componentWillUnmount() {
        let el = document.getElementById('stStripeScript')
        if (el) el.parentNode.removeChild(el)
    }

    render() {
        if (!this.state.init) return null

        let {step, completed, plan} = this.state,
            count = step + 1,
            Step = steps[this.steps[step]],
            randGen = window.crypto.getRandomValues(new Uint8Array(1)),//.toString('hex'),
            ಠ_ಠ = this['step'+step]

        return(
            <StripeProvider stripe={this.state.stripe}>
                <Elements>
                        <section className="stCheckoutWindow">
                            <div className="stepSide">
                                <div><h1><i class="fas fa-lock"></i> Checkout</h1></div>
                                <div>{count}</div>
                            </div>
                            <div className="checkSide">
                                <form id={"st"+randGen} action="/checkout" onSubmit={ಠ_ಠ}>
                                    <Step {...this.state} />
                                    <Buttons back={this.prevStep} completed={completed} steps={this.steps.length} count={count} step={step}/>
                                </form>
                            </div>
                        </section>
                </Elements>
            </StripeProvider>
        )
    }
}