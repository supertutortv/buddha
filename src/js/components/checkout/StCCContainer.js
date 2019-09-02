import React from 'react'
import {injectStripe, CardElement} from 'react-stripe-elements'

const cardIcons = {
    'Visa': <i class="fab fa-cc-visa"></i>,
    'MasterCard': <i class="fab fa-cc-mastercard"></i>,
    'American Express': <i class="fab fa-cc-amex"></i>,
    'Discover': <i class="fab fa-cc-discover"></i>,
    'Diners Club': <i class="fab fa-cc-diners-club"></i>,
    'default': <i class="fas fa-credit-card"></i>
}

const _stcont = ({card}) => {
    let stripeYuh = null

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
        </st-cc-container>
    )
}

const StCCContainer = injectStripe(_stcont)

export default StCCContainer