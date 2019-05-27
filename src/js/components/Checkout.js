import React from 'react'
import { StripeProvider, Elements, CardElement } from 'react-stripe-elements'
import * as methods from './signup/methods'
import { AuthContext } from '../context'

export default class Checkout extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            init: false,
            step: 0,
            update: true,
            loading: true,
            plan: savedSU ? savedSU.plan : savedSU,
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

        Object.keys(methods).forEach((method) => {
            this[method] = methods[method].bind(this)
        })

        this.initSession()
    }

    componentDidMount() {
        _st.loading = false
    }

    componentWillUnmount() {
        let el = document.getElementById('stStripeScript')
        if (el) el.parentNode.removeChild(el)
    }

    render() {
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
                                        <div className="checkSide"><pre>{JSON.stringify(this.state.customer)}</pre></div>
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