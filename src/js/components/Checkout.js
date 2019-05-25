import React from 'react'
import { StripeProvider, Elements, CardElement } from 'react-stripe-elements'
import * as methods from './signup/methods'
import { AuthContext } from '../context'

export default class Checkout extends React.Component {
    constructor(props) {
        super(props)

        let savedSU = localStorage.getItem('_stT-signup')

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
        this.newCard()
        _st.loading = false
    }

    componentWillUnmount() {
        let el = document.getElementById('stStripeScript')
        if (el) el.parentNode.removeChild(el)
    }

    render() {
        if (!this.state.init) return null
        console.log(this.props.plan)
        return(
            <AuthContext.Consumer>
                {auth => {
                    return (
                        <StripeProvider stripe={this.state.stripe}>
                            <Elements>
                                    <section className="stCheckoutWindow" onClick={(e) => e.stopPropagation()}>
                                        <div className="stepSide">
                                            <div><h1><i class="fas fa-lock"></i> Checkout</h1></div>
                                            <div></div>
                                        </div>
                                        <div className="checkSide"></div>
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