import React from 'react'
import {Redirect} from 'react-router-dom'
import * as _st from '../../classes/st'

export const billing = () => <div>billing</div>
export const shipping = () => <div>shipping</div>
export const pay = () => <div>pay</div>
export const thankyou = () => <div>Thank you!</div>

export const PlanComp = () => {

}

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
    return <div>account</div>
}