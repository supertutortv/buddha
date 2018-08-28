import React from 'react'
import {Link,Route,Switch,Redirect} from 'react-router-dom'
import * as _st from '../../classes/st'

export const billing = () => <div>billing</div>
export const shipping = () => <div>shipping</div>
export const pay = () => <div>pay</div>
export const thankyou = () => <div>Thank you!</div>

export function plans() {
    var plans = []
    _st.plans.forEach((plan) => {
        plans.push(
            <a id={'stPlan-'+plan.id} className={'stPlan '+plan.slug} onClick={this.initSession}>{plan.name}</a>
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

export function account() {
    var cust = this.state.session.customer
    return (
        <form id="step-2" className="stFormStep row" onSubmit={this.createAccount}>
            <div className="stFormHeader col s12">
                <h2>Awesome! Let's create your account!</h2>
                <span>Create your account below. Don't worry, we do not and will not abuse, misuse, or sell your information. Read our <a target="_blank" href="https://supertutortv.com/privacy-policy">privacy policy</a> for more info.</span>
            </div>
            <div id="stSignupAccount" className="stFormBody col s12">
                <div className="input-field required col s12 m6 st-input-half-left">
                    <input className="browser-default validate" type="text" name="customer|account|firstname" placeholder="First Name" value={cust.account.firstname} required />
                </div>
                <div className="input-field required col s12 m6 st-input-half-right">
                    <input className="browser-default validate" type="text" name="customer|account|lastname" placeholder="Last Name" value={cust.account.lastname} required/>
                </div>
                <div className="input-field required col s12">
                    <input className="browser-default validate email" type="email" name="customer|account|email" placeholder="Email Address" value={cust.account.email} required/>
                </div>
                <div className="input-field required col s12">
                    <input className="browser-default validate" type="password" name="customer|account|password" placeholder="Password" value={cust.account.password} required/>
                </div>
            </div>
            <div className="stFormButtons col s12">
                <button id="stBtn_account" type="submit" className="stFormButton pmt-button btn waves-effect waves-light" >Next >></button>
            </div>
        </form>
    )
}