import React from 'react'

const PricingTable = ({state}) => {
    return (
        <div id="stSignupPricingTable" className="col s12">
            <div id="stPricingHeading" className="row">
                <div className="col s9">ITEM</div>
                <div className="col s3">PRICE</div>
            </div>
            <div id="stPricingItems" className="row">{console.log(state)}</div>
            <div id="stPricingTotals" className="row">
                <div className="input-field col s9">
                    <input class="browser-default coupon" name="pricing|coupon|value" type="text" placeholder="Coupon code" onBlur={setChecker} />
                </div>
                <div id="stPricingTotal" className="col s3">$0</div>
            </div>
        </div>
    )
}

export default PricingTable