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
                    <div className="stFormButtons row">
                        <button id="stBtn_account" type="submit" className="stFormButton btn waves-effect waves-light" >Next >></button>
                    </div>
                    <div id="stFormErrors" className="row">{msg}</div>
                </form>
            </div>
            <h1>Create your account.</h1>
            <span>Don't worry, we do not and will not abuse, misuse, or sell your information. Read our <a target="_blank" href="https://supertutortv.com/privacy-policy">privacy policy</a> for more info.</span>
        </div>
    )
}

const ThankYou = () => <div>Thank you!</div>

export { Plans, Account, Payment, ThankYou }