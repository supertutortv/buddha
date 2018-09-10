import React from 'react'

const PricingTable = ({state,setChecker,toPrice}) => {
    return (
        <div id="stSignupPricingTable" className="col s12">
            <div id="stPricingHeading" className="row">
                <div className="col s9">ITEM</div>
                <div className="col s3 right-al">PRICE</div>
            </div>
            <div id="stPricingItems" className="row">
                {state.items.map((item) => {
                    return (
                        <div className="row">
                            <div className="col s9">{item.name}</div>
                            <div className="col s3 right-al">{toPrice(item.amt)}</div>
                        </div>
                    )
                })}
            </div>
            <div id="stPricingTotals" className="row">
                <div className="input-field col s9">
                    <input class="browser-default coupon" name="pricing|coupon|value" type="text" placeholder="Coupon code" onBlur={setChecker} />
                </div>
                <div id="stPricingTotal" className="col s3 right-al">{'$'+toPrice(state.pricing.total)}</div>
            </div>
        </div>
    )
}

export default PricingTable