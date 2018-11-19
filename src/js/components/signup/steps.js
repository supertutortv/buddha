import React from 'react'
import {Link,Route,Switch,Redirect} from 'react-router-dom'
import Payment from './payment'

const Account = ({ createAccount, updateInp, error, state }) => {
    var msg = (error.message.match(/already in use/)) ? <strong>{error.message}<Link to='/login'>{'Sign in'}</Link></strong> : <strong>{error.message}</strong>
    let { plan } = state
    return (
        <React.Fragment>
        <div className="stSignupStep stSignupAccount">
            <div className="stSignupTitle">
                <h1>Signup - {plan.name}</h1>
                <span>Don't worry, we do not and will not abuse, misuse, or sell your information. Read our <a target="_blank" href="https://supertutortv.com/privacy-policy">privacy policy</a> for more info.</span>
            </div>
            <div className="stSignupInner">
                <form className="stAccountForm stFormWrapper" onSubmit={createAccount}>
                    <div className="heading">Create your account</div>
                    <div id="stSignupDetails" className="stFormBody row">
                        <div className="input-field required">
                            <input className="browser-default validate" type="text" name="customer|account|firstname" placeholder="First Name" onBlur={updateInp} required />
                        </div>
                        <div className="input-field required">
                            <input className="browser-default validate" type="text" name="customer|account|lastname" placeholder="Last Name" onBlur={updateInp} required/>
                        </div>
                        <div className="input-field required">
                            <input className="browser-default validate email" type="email" name="customer|account|email" placeholder="Email Address" onBlur={updateInp} required/>
                        </div>
                        <div className="input-field required">
                            <input className="browser-default validate" type="password" name="customer|account|password" placeholder="Password" onBlur={updateInp} required/>
                        </div>
                    </div>
                    <div className="stFormButtons">
                        <button id="stBtn_account" type="submit" className="stFormButton btn waves-effect waves-light" >Next >></button>
                    </div>
                    <div className="stFormErrors">{msg}</div>
                </form>
            </div>
        </div>
        </React.Fragment>
    )
}

const ThankYou = ({state}) => {
    return (
        <div id="stSignupThankYou" class="stSignupStep">
            <h1>Thank you!</h1>
            <div class="stSignupInner stFormWrapper">
                <div className="row">Your order code is <strong>{state.thankYou.id}</strong>. Keep this for your records.</div>
                <div className="row">
                    <div className="stuff">
                        <span>You will receive a payment receipt when your card is charged, either after your trial expires or very soon if you skipped the trial. You will also receive a welcome email with instructions for using the course. Or if you'd like to get started right now, just click the button below.</span>
                    </div>
                </div>
                <div className="stFormButtons">
                    <Link id="stBtn_thankyou" className="stFormButton btn waves-effect waves-light" to="/dashboard" >Go to dashboard</Link>
                </div>
            </div>
        </div>
    )
}

export { Account, Payment, ThankYou }