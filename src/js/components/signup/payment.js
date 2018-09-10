import React from 'react'
import {injectStripe, CardElement} from 'react-stripe-elements'
import CountryDD from './pieces/CountryDD'
import PricingTable from './pieces/PricingTable'

const _Payment = ({updateInp, submitPayment, state, toPrice, setChecker, calculatePricing}) => {
    calculatePricing()
    var trialDate = new Date()
    trialDate.setDate(trialDate.getDate() + 5)
    return (
        <div id="stSignupPayment" className="stSignupStep row">
            <div className="stSignupInner row">
                <div className="stInfoWrap row">
                    <form id="stSignupPaymentForm" className="stFormWrapper col s12 m8" onSubmit={submitPayment}>
                        <div id="stSignupFormShipping" className="row">
                            <fieldset>
                                <legend>Shipping</legend>
                                <div className="input-field required col s12">
                                    <input className="browser-default validate shipping address_line1" type="text" name="customer|shipping|address|line1" placeholder="Address 1" onBlur={updateInp} required/>
                                </div>
                                <div className="input-field col s12">
                                    <input className="browser-default validate shipping address_line2" type="text" name="customer|shipping|address|line2" placeholder="Address 2" onBlur={updateInp} />
                                </div>
                                <div className="input-field required col s12 m6 stInputHalfLeft">
                                    <input className="browser-default validate shipping address_city" type="text" name="customer|shipping|address|city" placeholder="City" onBlur={updateInp} required/>
                                </div>
                                <div className="input-field required col s12 m6 stInputHalfRight">
                                    <input className="browser-default validate shipping address_state" type="text" name="customer|shipping|address|state" placeholder="State" onBlur={updateInp} required/>
                                </div>
                                <div className="input-field required col s12 m6 stInputHalfLeft">
                                    <input className="browser-default validate shipping address_zip tax" type="text" name="customer|shipping|address|postal_code" placeholder="Postal Code" onBlur={updateInp} required/>
                                </div>
                                <div className="input-field required col s12 m6 stInputHalfRight">
                                    <CountryDD className="browser-default validate shipping address_country" name="customer|shipping|address|country" onBlur={updateInp} required/>
                                </div>
                            </fieldset>
                        </div>
                        <div id="stSignupFormOptions"className="row">
                        <fieldset>
                                <legend>Options</legend>
                                <div class="st-checkout-spaced col s12">
                                    <label>
                                        <input name="customer|options|priorityShip" className="filled-in" value="1" type="checkbox" onChange={updateInp}/>
                                        <span>I want Priority Shipping (+$7.05, U.S. only)</span>
                                    </label>
                                </div>
                                <div className="st-checkout-spaced col s12">
                                    <label>
                                        <input name="customer|options|skipTrial" className="filled-in" value="1" type="checkbox" onChange={updateInp} />
                                        <span>Skip the trial period and start immediately</span>
                                    </label>
                                </div>
                                <div class="st-checkout-spaced col s12">
                                    <label>
                                        <input name="customer|options|mailingList" className="filled-in" value="1" type="checkbox" onChange={updateInp} />
                                        <span>Add me to the SupertutorTV mailing list for future discounts and offers</span>
                                    </label>
                                </div>
                        </fieldset>
                        </div>
                    </form>
                    <div id="stSignupPricing" className="col s12 m4 z-depth-3">
                        <PricingTable state={state} toPrice={toPrice} setChecker={setChecker} />
                        <div id="stPricingCardElement" className="col s12"><CardElement onChange={(e) => console.log(e)} /></div>
                        <div className="st-checkout-spaced required col s12">
                            <label>
                                <input id="stTermsBox" name="customer|options|terms" className="filled-in" value="1" type="checkbox" onChange={updateInp} required/>
                                <span>I have read SupertutorTV's Terms & Conditions</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div id="stSignupPaymentBottom" className="stStepBottom row">
                    <h1>Set up your payment.</h1>
                    <span>5 day free trial expires <strong>{trialDate.toLocaleDateString()}</strong></span>
                </div>
            </div>
        </div>
    )
}

const Payment = injectStripe(_Payment)

export default Payment