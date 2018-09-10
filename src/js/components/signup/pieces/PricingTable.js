import React from 'react'

const PricingTable = ({state}) => {
    return (
        <div id="stSignupPricingTable" className="col s12">
            <div id="stPricingHeading" className="row">
                <div className="col s9">Item</div>
                <div className="col s3">Price</div>
            </div>
            <div id="stPricingItems" className="row">{console.log(state)}</div>
            <div id="stPricingTotals" className="row">
                <div className="col s9">Coupon</div>
                <div className="col s3">Total</div>
            </div>
        </div>
    )
}

export default PricingTable