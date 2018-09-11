import React from 'react'
import {Link,Route,Switch,Redirect} from 'react-router-dom'
import Payment from './payment'

const STPlan = ({slug, setPlan, exClass='', highlight=false}) => {
    let plan = _st.plans[slug],
        hLt = highlight ? ' highlight' : ''
    return (
        <div className={'col s12 m4 stPlan '+exClass}>
            <a id={'stPlan_'+slug} data-obj={JSON.stringify(plan)} className={"stPlanInner row z-depth-3"+hLt} onClick={(e) => setPlan(e)}>
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

const Plans = ({ setPlan }) => {
    return (
    <React.Fragment>
    <div id="stSignupDiagSep" className="row">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#ffffff" width="100%" height="100px" viewBox="0 0 1920 100" preserveAspectRatio="none">
            <polygon points="0,0 0,100 1920,0 "></polygon>
        </svg>
    </div>
    <div id="stSignupPlans" class="stSignupStep row">
        <div class="stSignupInner col s12">
            <div id="stPlansContainer" class="stFormBody col s12">
                <STPlan exClass="first" slug="the-best-act-prep-course-ever" setPlan={setPlan} />
                <STPlan slug="sat-act-bundle" setPlan={setPlan} highlight />
                <STPlan exClass="last" slug="the-best-sat-prep-course-ever" setPlan={setPlan} />
            </div>
        </div>
        <h1>Select your plan.</h1>
    </div>
    </React.Fragment>
)}

const Account = ({ createAccount, updateInp, error }) => {
    var msg = (error.message.match(/already in use/)) ? <strong>{error.message}<Link to='/login'>{'Sign in'}</Link></strong> : <strong>{error.message}</strong>
    return (
        <React.Fragment>
        <div id="stSignupDiagSep" className="row">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#ffffff" width="100%" height="100px" viewBox="0 0 1920 100" preserveAspectRatio="none">
                <polygon points="0,0 0,100 1920,0 "></polygon>
            </svg>
        </div>
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
                    <div className="stFormButtons row">
                        <button id="stBtn_account" type="submit" className="stFormButton btn waves-effect waves-light" >Next >></button>
                    </div>
                    <div id="stFormErrors" className="row">{msg}</div>
                </form>
            </div>
            <h1>Create your account.</h1>
            <span>Don't worry, we do not and will not abuse, misuse, or sell your information. Read our <a target="_blank" href="https://supertutortv.com/privacy-policy">privacy policy</a> for more info.</span>
        </div>
        </React.Fragment>
    )
}

const ThankYou = ({state}) => {
    return (
        <div id="stSignupThankYou" class="stSignupStep row">
            <h1>Thank you!</h1>
            <div class="stSignupInner stFormWrapper col s12">
                <div className="row">Your order code is <strong>{state.thankYou.id}</strong>. Keep this for your records.</div>
                <div className="row">
                    <div className="col s12 m6 offset-m3">
                        <span>You will receive a payment receipt when your card is charged, either after your trial expires or very soon if you skipped the trial. You will also receive a welcome email with instructions for using the course. Or if you'd like to get started right now, just click the button below.</span>
                    </div>
                </div>
                <div className="stFormButtons row">
                    <a id="stBtn_thankyou" className="stFormButton btn waves-effect waves-light" onClick={() => <Redirect to="/dashboard" />} >Go to dashboard</a>
                </div>
            </div>
        </div>
    )
}

export { Plans, Account, Payment, ThankYou }