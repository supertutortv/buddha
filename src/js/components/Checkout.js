import React from 'react'
import { StripeProvider, Elements, CardElement } from 'react-stripe-elements'
import methods from './checkout/methods'
import LogoSVG from './LogoSVG'

export default class Checkout extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            init: false,
            completed: false,
            status: 'active',
            step: 0,
            card: null,
            update: true,
            stripe: null,
            ...props.payload
        }

        this.state.error = {
            id: '',
            message: ''
        }

        Object.keys(methods).forEach((method) => {
            this[method] = methods[method].bind(this)
        })
    }

    componentDidMount() {
        document.body.classList.add('checkout')
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
            return {
                init: true,
                stripe: (window.Stripe) ? window.Stripe(key) : null
            }
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
        document.body.classList.remove('checkout')
        let els = document.querySelectorAll('[name*="__privateStripe"]'),
            el = document.getElementById('stStripeScript')
        for (let i = 0; i < els.length; i++) if (els[i]) els[i].parentNode.removeChild(els[i])
        if (el) el.parentNode.removeChild(el)
    }

    render() {
        if (!this.state.init) return null

        let {children,amt,action} = this.props,
            {error, ...state} = this.state,
            disabled = (state.status === 'processing')

        return(
            <StripeProvider stripe={state.stripe}>
                <Elements>
                    <section className="stCheckoutWindow" onClick={(e) => this.props.closeCheckout()}>
                        <div className="stCheckoutInner" onClick={(e) => e.stopPropagation()}>
                            <figure className="stCheckoutLogo">
                                <LogoSVG/>
                            </figure>
                            <h3>Secure Payment Form</h3>
                            <form action={action} onSubmit={async (e) => {
                                e.preventDefault()
                                if (this.state.status === 'processing') return false
                                
                                this.setState({
                                    status: 'processing'
                                })
                                
                                let nameOnCard = e.target.querySelector('[name="name"').value,
                                    { token } = await state.stripe.createToken(state.card,{name: nameOnCard})

                                //ಠ_ಠ(e,state,(d) => {})
                            }}>
                                <div className="stIfR99">
                                    <input aria-label="Name on card" className="validate" type="text" name="name" required validation="text"/>
                                    <label aria-hidden="true" for="name">Name on card</label>
                                </div>
                                <div id="stPricingCardElement">
                                    <CardElement id="stripeInject" onChange={(d) => {
                                        if (typeof d !== 'undefined') {
                                            if (typeof d.error !== 'undefined') return this.setState({
                                                card: null,
                                                error: {
                                                    id: 'stripeError',
                                                    message: result.error.message
                                                }
                                            })

                                            if (d.complete && !d.empty) this.setState({
                                                card: d,
                                                error: {
                                                    id: '',
                                                    message: ''
                                                }
                                            })
                                        }
                                    }}/>
                                </div>
                                {(error.message)
                                    ? <div className="stAccountErrors"><strong>{error.message}</strong></div>
                                    : null
                                }
                                <div className="stSubmitBlock">
                                    <button id="paySubmit" name="paySubmit" type="submit" className={disabled ? 'active' : ''}>
                                        <span>{disabled ? 'Processing...' : 'Pay '+amt}</span>
                                        {state.status === 'active' ? 
                                            <i class="fas fa-lock"></i> :
                                            (state.status === 'processing' ? <i class="fas fa-spinner"></i> : <i class="fas fa-check-circle"></i>)}
                                    </button>
                                </div>
                            </form>
                            {children}
                        </div>
                    </section>
                </Elements>
            </StripeProvider>
        )
    }
}