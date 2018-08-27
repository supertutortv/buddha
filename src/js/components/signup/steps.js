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
    <div id="step-2" class="stFormStep row">
        <div class="stFormHeader col s12">
            <h2>Select a plan.</h2>
            <span>All plans come with a 5 day free trial. <strong>NOTE:</strong> Your card will not be charged until your trial period is over, and you're free to cancel at any time. If your course comes with free books, they will not ship until your trial has expired.</span>
        </div>
        <div id="stSignupPlans" class="stFormBody col s12">{plans}</div>
    </div>
)}

export function account() {
    return (
        <div id="step-1" class="stFormStep row">
            <div class="stFormHeader col s12">
                <h2>Awesome! Let's create your account!</h2>
                <span>Create your account below. Don't worry, we do not and will not abuse, misuse, or sell your information. Read our <a target="_blank" href="https://supertutortv.com/privacy-policy">privacy policy</a> for more info.</span>
            </div>
            <div id="stSignupAccount" class="stFormBody col s12">
                <div class="input-field required col s12 m6 st-input-half-left">
                    <input class="browser-default validate" type="text" name="st-customer-account-firstname" placeholder="First Name" required />
                </div>
                <div class="input-field required col s12 m6 st-input-half-right">
                    <input class="browser-default validate" type="text" name="st-customer-account-lastname" placeholder="Last Name" required/>
                </div>
                <div class="input-field required col s12">
                    <input class="browser-default validate email" type="email" name="st-customer-account-email" placeholder="Email Address" required/>
                </div>
                <div class="input-field required col s12">
                    <input class="browser-default validate" type="password" name="st-customer-account-password" placeholder="Password" required/>
                </div>
            </div>
            <div class="stFormButtons col s12">
                <button id="stBtn_account" class="stFormButton pmt-button btn waves-effect waves-light" onclick="_st.signup.next(this.id)">Next >></button>
            </div>
            {_st.form.overlay()}
        </div>
    )
}