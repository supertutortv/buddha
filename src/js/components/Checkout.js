import React from 'react'
import { StripeProvider, Elements, CardElement } from 'react-stripe-elements'
import * as methods from './signup/methods'
import { AuthContext } from '../context'

export default class Checkout extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            init: false,
            step: this.props.step,
            update: true,
            loading: true,
            plan: this.props.plan,
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

        this.createStripeScript()
    }

    componentDidMount() {
        _st.loading = false
    }

    componentWillUnmount() {
        let el = document.getElementById('stStripeScript')
        if (el) el.parentNode.removeChild(el)
    }

    render() {
        //if (!this.state.init) return null
        return(
            <AuthContext.Consumer>
                {auth => {
                    return (
                        <StripeProvider stripe={this.state.stripe}>
                            <Elements>
                                    <section className="stCheckoutWindow" onClick={(e) => e.stopPropagation()}>
                                        <h1><i class="fas fa-lock"></i> Checkout</h1>
                                    </section>
                                {/* <CardElement onChange={(e)=>console.log(e, auth.plan)} /> */}
                            </Elements>
                        </StripeProvider>
                    )
                }}
            </AuthContext.Consumer>
        )
    }
}