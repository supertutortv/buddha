import React from 'react'

const PricingTable = ({state,setChecker,toPrice}) => {
    return (
        <div className="stSignupPricingTable">
            <div id="stPricingHeading" className="row">
                <div className="col s8">ITEM</div>
                <div className="col s4 right-al">PRICE</div>
            </div>
            <div className="stPricingItems">
                {state.items.map((item) => {
                    return (
                        <div className="item row">
                            <div className="col s8">{item.name}</div>
                            <div className="col s4 right-al">{toPrice(item.amt)}</div>
                        </div>
                    )
                })}
            </div>
            <div className="stPricingTotals">
                <div className="input-field couponInp col s8">
                    <input class="browser-default validate coupon" name="pricing|coupon|value" type="text" placeholder="Coupon code" onBlur={setChecker} />
                </div>
                <div id="stPricingTotal" className="col s4 right-al">{'$'+toPrice(state.pricing.total)}</div>
            </div>
        </div>
    )
}

export default PricingTable