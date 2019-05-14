import React from 'react'
import {Link,Route,Switch,Redirect} from 'react-router-dom'
import Payment from './payment'

const Account = ({ createAccount, updateInp, error, state }) => {
    var msg = (error.message.match(/already in use/)) ? <strong>{error.message}<Link to='/login'>{'Sign in'}</Link></strong> : <strong>{error.message}</strong>
    let { item } = state
    return (
        <main className="stSignupAccount">
            <div className="stSignupInner">
                <form className="stAccountForm stForm" onSubmit={createAccount}>
                    <header className="heading">
                        <h1>SupertutorTV</h1>
                    </header>
                    <fieldset className="stAccountBody">
                        <div className="input-field required">
                            <input type="text" name="customer|account|firstname" placeholder="First Name" onBlur={updateInp} required />
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
                    </fieldset>
                    <div className="stAccountErrors">{msg}</div>
                    <div className="stAccountButtons">
                        <button type="submit" className="stAccountButton btn" >Create Your Account</button>
                    </div>
                </form>
                <code className="insteadLogin">Already have an account? <Link to='/login'>{'Log In'}</Link></code>
            </div>
        </main>
    )
}

const ThankYou = ({state,hist}) => {
    return (
        <div className="stSignupThankYou stSignupStep">
            <h1>Thank you!</h1>
            <div class="stSignupInner stFormWrapper">
                <div className="row">Your order code is <strong>{state.thankYou.id}</strong>. Keep this for your records.</div>
                <div className="row">
                    <div className="stuff">
                        <span>You will receive a payment receipt when your card is charged, either after your trial expires or very soon if you skipped the trial. You will also receive a welcome email with instructions for using the course. Or if you'd like to get started right now, just click the button below.</span>
                    </div>
                </div>
                <div className="stFormButtons">
                    <button id="stBtn_thankyou" className="stFormButton btn waves-effect waves-light" onClick={() => hist.replace('/dashboard')}>Go to dashboard</button>
                </div>
            </div>
        </div>
    )
}

export { Account, Payment, ThankYou }