import React from 'react'
import {Link,Route,Switch,Redirect} from 'react-router-dom'
import CountryDD from '../pieces/CountryDD'

const Pay = () => <div>pay</div>
const ThankYou = () => <div>Thank you!</div>

const Plans = ({ initSession }) => {
    var plans = []
    _st.plans.forEach((plan) => {
        plans.push(
            <a id={'stPlan-'+plan.id} className={'stPlan '+plan.slug} onClick={initSession}>{plan.name}</a>
        )
    })
    return (
    <div id="step-1" class="stFormStep row">
        <div class="stFormHeader col s12">
            <h2>Select a plan.</h2>
            <span>All plans come with a 5 day free trial. <strong>NOTE:</strong> Your card will not be charged until your trial period is over, and you're free to cancel at any time. If your course comes with free books, they will not ship until your trial has expired.</span>
        </div>
        <div id="stSignupPlans" class="stFormBody col s12">{plans}</div>
    </div>
)}

const Account = (props) => {
    console.log(props.createAccount)
    return (
        <form id="step-2" className="stFormStep row" onSubmit={props.createAccount}>
            <div className="stFormHeader col s12">
                <h2>Awesome! Let's create your account!</h2>
                <span>Create your account below. Don't worry, we do not and will not abuse, misuse, or sell your information. Read our <a target="_blank" href="https://supertutortv.com/privacy-policy">privacy policy</a> for more info.</span>
            </div>
            <div id="stSignupAccount" className="stFormBody col s12">
                <div className="input-field required col s12 m6 st-input-half-left">
                    <input className="browser-default validate" type="text" name="customer|account|firstname" placeholder="First Name" onBlur={props.updateInp} required />
                </div>
                <div className="input-field required col s12 m6 st-input-half-right">
                    <input className="browser-default validate" type="text" name="customer|account|lastname" placeholder="Last Name" onBlur={props.updateInp} required/>
                </div>
                <div className="input-field required col s12">
                    <input className="browser-default validate email" type="email" name="customer|account|email" placeholder="Email Address" onBlur={props.updateInp} required/>
                </div>
                <div className="input-field required col s12">
                    <input className="browser-default validate" type="password" name="customer|account|password" placeholder="Password" onBlur={props.updateInp} required/>
                </div>
            </div>
            <div className="stFormButtons col s12">
                <button id="stBtn_account" type="submit" className="stFormButton pmt-button btn waves-effect waves-light" >Next >></button>
            </div>
        </form>
    )
}

const Billing = ({ updateInp, changeStep }) => {
    return (
        <form id="step-3" className="stFormStep row" onSubmit={(e) => changeStep(true,e)}>
            <div className="stFormHeader col s12">
                <h2>What's your billing address?</h2>
                <span>This is the address associated with the card you are going to use for payment. We use this to verify your payment, so please check the accuracy of the information you provide.</span>
            </div>
            <div id="stSignupBilling" className="stFormBody col s12">
                <div className="input-field required col s12">
                    <input className="browser-default validate billing address1" type="text" name="customer|billing|address_line1" placeholder="Address 1" onBlur={updateInp} required/>
                </div>
                <div className="input-field col s12">
                    <input className="browser-default validate billing address2" type="text" name="customer|billing|address_line2" placeholder="Address 2" onBlur={updateInp}/>
                </div>
                <div className="input-field required col s12 m6 st-input-half-left">
                    <input className="browser-default validate billing city" type="text" name="customer|billing|address_city" placeholder="City" onBlur={updateInp} required/>
                </div>
                <div className="input-field required col s12 m6 st-input-half-right">
                    <input className="browser-default validate billing state" type="text" name="customer|billing|address_state" placeholder="State" onBlur={updateInp} required/>
                </div>
                <div className="input-field required col s12 m6 st-input-half-left">
                    <input className="browser-default validate billing pcode" type="text" name="customer|billing|address_zip" placeholder="Postal Code" onBlur={updateInp} required/>
                </div>
                <div className="input-field required col s12 m6 st-input-half-right">
                    {<CountryDD className="browser-default validate billing country" name="customer|billing|address_country" onBlur={updateInp} required/>}
                </div>
            </div>
            <div className="stFormButtons col s12">
                <button id="stBtn_billing" className="stFormButton pmt-button btn waves-effect waves-light" type="submit">Next >></button>
            </div>
        </form>
    )
}

const Shipping = () => {
    return (
        <form id="step-4" className="stFormStep row" onSubmit={() => null}>
            <div className="stFormHeader col s12">
                <h2>Where are we sending your books?</h2>
                <span>Even if you're signing up for a course that doesn't ship books, we still collect this information to keep on file in your account with our payment processor. We never share this information with anyone.</span>
            </div>
            <div id="stSignupShipping" className="stFormBody col s12">
                <div className="st-checkout-spaced col s12">
                    <label>
                        <input name="customer|options|copyAddress" className="filled-in" value="1" type="checkbox" onChange={updateInp} />
                        <span>Same as billing address</span>
                    </label>
                </div>
                <div className="st-checkout-spaced col s12">
                    <label>
                        <input name="customer|options|priorityShip" className="filled-in" value="1" type="checkbox" onChange={updateInp} />
                        <span>I want Priority Shipping (+$7.05, U.S. only)</span>
                    </label>
                </div>
                <div className="input-field required col s12">
                    <input className="browser-default validate shipping address_line1" type="text" name="customer|shipping|address|line1" placeholder="Address 1" onBlur={updateInp} required/>
                </div>
                <div className="input-field col s12">
                    <input className="browser-default validate shipping address_line2" type="text" name="customer|shipping|address|line2" placeholder="Address 2" onBlur={updateInp} />
                </div>
                <div className="input-field required col s12 m6 st-input-half-left">
                    <input className="browser-default validate shipping address_city" type="text" name="customer|shipping|address|city" placeholder="City" onBlur={updateInp} required/>
                </div>
                <div className="input-field required col s12 m6 st-input-half-right">
                    <input className="browser-default validate shipping address_state" type="text" name="customer|shipping|address|state" placeholder="State" onBlur={updateInp} required/>
                </div>
                <div className="input-field required col s12 m6 st-input-half-left">
                    <input className="browser-default validate shipping address_zip tax" type="text" name="customer|shipping|address|postal_code" placeholder="Postal Code" onBlur={updateInp} required/>
                </div>
                <div className="input-field required col s12 m6 st-input-half-right">
                    {<CountryDD classNameName="browser-default validate shipping address_country" name="customer|shipping|address|country" onBlur={updateInp} required/>}
                </div>
            </div>
            <div className="stFormButtons col s12">
                <button className="stFormButton pmt-button btn waves-effect waves-light" onClick={() => null}>{'<< Back'}</button>
                <button id="stBtn_shipping" className="stFormButton pmt-button btn waves-effect waves-light" type="submit">Next >></button>
            </div>
        </form>
    )
}

export { Plans, Account, Billing, Shipping, Pay, ThankYou }