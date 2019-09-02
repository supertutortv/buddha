import React, { useState } from 'react'
import {StripeProvider, Elements, CardElement} from 'react-stripe-elements'

export default ({card}) => {
    let [ stripeYuh, setStripeYuh ] = useState((window.Stripe) ? window.Stripe(_st.stripe) : null)

    const cardIcons = {
        'Visa': <i class="fab fa-cc-visa"></i>,
        'MasterCard': <i class="fab fa-cc-mastercard"></i>,
        'American Express': <i class="fab fa-cc-amex"></i>,
        'Discover': <i class="fab fa-cc-discover"></i>,
        'Diners Club': <i class="fab fa-cc-diners-club"></i>,
        'default': <i class="fas fa-credit-card"></i>
    },
    addNewCard = (e) => {
        e.preventDefault()
        if (stripeYuh === null && !window.Stripe) {
            const s = document.createElement('script')
            s.type = 'text/javascript'
            s.id = 'stStripeScript'
            s.async = true
            s.src = 'https://js.stripe.com/v3/'
    
            s.addEventListener('load', () => {
                setStripeYuh(window.Stripe(_st.stripe))
            })
    
            document.body.appendChild(s)
        }
    }

    return (
        <st-cc-container>
            <StripeProvider stripe={stripeYuh}>
                <Elements>
                    <div id="activCardEl">
                        {stripeYuh === null ?
                            <>
                                <p className="ccBrand">{(card.brand in cardIcons) ? cardIcons[card.brand] : cardIcons['default']}</p>
                                <p className="ccDetails">
                                    <span>{card.name}</span><br/>
                                    <span className="last4">•••• {card.last4}</span>
                                </p>
                            </> :
                        <CardElement id="stripeInject" onChange={(d) => {
                            if (typeof d !== 'undefined') {
                                if (typeof d.error !== 'undefined') return this.setState({
                                    cardComplete: false,
                                    error: {
                                        id: 'checkoutError',
                                        message: d.error.message
                                    }
                                })

                                if (d.complete && !d.empty) this.setState({
                                    cardComplete: true,
                                    error: {
                                        id: '',
                                        message: ''
                                    }
                                })
                            }
                        }} onReady={(el) => {
                            this.setState({card: el})
                        }}/>}
                    </div>
                </Elements>
            </StripeProvider>
            {(stripeYuh === null) ? <div className="newCard">
                <a onClick={addNewCard}>
                    + add new card
                </a>
            </div> : null }
        </st-cc-container>
    )
}