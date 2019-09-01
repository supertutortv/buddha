import React from 'react'

export default ({card}) => {
    console.log(card)

    const cardIcons = {
        'Visa': <i class="fab fa-cc-visa"></i>,
        'MasterCard': <i class="fab fa-cc-mastercard"></i>,
        'American Express': <i class="fab fa-cc-amex"></i>,
        'Discover': <i class="fab fa-cc-discover"></i>,
        'Diners Club': <i class="fab fa-cc-diners-club"></i>,
        'default': <i class="fas fa-credit-card"></i>
    }

    return (
        <st-cc-container>
            <div>
                <p>{(card.brand in cardIcons) ? cardIcons[card.brand] : cardIcons['default']}</p>
                <p>
                    <span>{card.name}</span><br/>
                    <span>•••• {card.last4}</span>
                </p>
            </div>
        </st-cc-container>
    )
}