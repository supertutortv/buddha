import React from 'react'
import {Link,Route,Switch,Redirect} from 'react-router-dom'
import CountryDD from '../pieces/CountryDD'

const STPlan = ({slug, initSession, exClass='', highlight=false}) => {
    let plan = _st.plans[slug],
        hLt = highlight ? ' highlight' : ''
    return (
        <div className={'col s12 m4 stPlan '+exClass}>
            <a id={'stPlan_'+slug} className={"stPlanInner row z-depth-3"+hLt} onClick={(e) => initSession(e)}>
                <div className="stPlanTest row">
                    <span className="test">{plan.test}</span>
                    <span className="name">{plan.name}</span>
                </div>
                <div className="stPlanPrice row">{'$'+plan.price/100}</div>
                <div className="stPlanItems row">{plan.list.map((li) => {
                    let newLi = li.match(/\*(.*)\*(.*)/)
                    return <div className="stPlanItem row">{newLi ? <span><strong>{newLi[1]}</strong>{newLi[2]}</span> : <span>{li}</span>}</div>
                })}</div>
            </a>
        </div>
    )
}

const Plans = ({ initSession }) => {
    return (
    <div id="stSignupPlans" class="stSignupStep row">
        <div class="stSignupInner col s12">
            <div id="stPlansContainer" class="stFormBody col s12">
                <STPlan exClass="first" slug="the-best-act-prep-course-ever" initSession={initSession} />
                <STPlan slug="sat-act-bundle" initSession={initSession} highlight />
                <STPlan exClass="last" slug="the-best-sat-prep-course-ever" initSession={initSession} />
            </div>
        </div>
        <h1>Select your plan.</h1>
    </div>
)}

const Account = ({ createAccount, updateInp, error }) => {
    var msg = (error.message.match(/already in use/)) ? <strong>{error.message}<Link to='/login'>{'Sign in'}</Link></strong> : <strong>{error.message}</strong>
    return (
        <div id="stSignupAccount" class="stSignupStep row">
            <div class="stSignupInner row">
                <form id="stAccountForm" className="stFormWrapper col s12 m6 offset-m3" onSubmit={createAccount}>
                    <div id="stSignupDetails" className="stFormBody row">
                        <div className="input-field required col s12 m6 stInputHalfLeft">
                            <input className="browser-default validate" type="text" name="customer|account|firstname" placeholder="First Name" onBlur={updateInp} required />
                        </div>
                        <div className="input-field required col s12 m6 stInputHalfRight">
                            <input className="browser-default validate" type="text" name="customer|account|lastname" placeholder="Last Name" onBlur={updateInp} required/>
                        </div>
                        <div className="input-field required col s12">
                            <input className="browser-default validate email" type="email" name="customer|account|email" placeholder="Email Address" onBlur={updateInp} required/>
                        </div>
                        <div className="input-field required col s12">
                            <input className="browser-default validate" type="password" name="customer|account|password" placeholder="Password" onBlur={updateInp} required/>
                        </div>
                    </div>
                    <div id="stFormErrors" className="row">{msg}</div>
                    <div className="stFormButtons row">
                        <button id="stBtn_account" type="submit" className="stFormButton btn waves-effect waves-light" >Next >></button>
                    </div>
                </form>
            </div>
            <h1>Create your account.</h1>
            <span>Don't worry, we do not and will not abuse, misuse, or sell your information. Read our <a target="_blank" href="https://supertutortv.com/privacy-policy">privacy policy</a> for more info.</span>
        </div>
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
                    <CountryDD className="browser-default validate billing country" name="customer|billing|address_country" onBlur={updateInp} required/>
                </div>
            </div>
            <div className="stFormButtons col s12">
                <button id="stBtn_billing" className="stFormButton pmt-button btn waves-effect waves-light" type="submit">Next >></button>
            </div>
        </form>
    )
}

const Shipping = ({ updateInp, changeStep }) => {
    return (
        <form id="step-4" className="stFormStep row" onSubmit={changeStep}>
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
                    <CountryDD classNameName="browser-default validate shipping address_country" name="customer|shipping|address|country" onBlur={updateInp} required/>
                </div>
            </div>
            <div className="stFormButtons col s12">
                <button className="stFormButton pmt-button btn waves-effect waves-light" onClick={() => changeStep(false)}>{'<< Back'}</button>
                <button id="stBtn_shipping" className="stFormButton pmt-button btn waves-effect waves-light" type="submit">Next >></button>
            </div>
        </form>
    )
}

const Payment = () => {
    return (
        <div id="stSignupPayment" className="stSignupStep row">
            <div className="stInfoWrap row">
                <div id="stSignupPricingTable" className="col s12 m4">Pricing</div>
                <div id="stSignupPaymentForm" className="col s12 m8">Form</div>
            </div>
            <div id="stSignupPaymentBottom" className="row">
                <h1>Set up your payment.</h1>
            </div>
        </div>
    )
}

const ThankYou = () => <div>Thank you!</div>

export { Plans, Account, Payment, ThankYou }