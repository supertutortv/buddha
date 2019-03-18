import React from 'react'
import FAIco from '../FAIco'

const SendForm = ({sent, sentMsg}) => {
    if (sent) {
        return (
            <div className="stResetSent">
                <strong>{sentMsg}</strong>
            </div>
        )
    } else {
        return (
        <React.Fragment>
            <div className="stPasswordHeader">
                <h1>Forgot your password?</h1>
            </div>
            <div className="stPasswordCredentials">
                <div className="input-field">
                    <input className="browser-default validate email" type="email" name="email" placeholder="Email Address" required />
                </div>
            </div>
            <div className="stFormButtons">
                <button className="stFormButton btn waves-effect waves-light">Send reset link</button>
            </div>
        </React.Fragment>
        )
    }
}

const ResetForm = ({sendReset,passMatch,sent,sentMsg}) => {
    if (sent) {
        return (
            <div className="stResetSent">
                <strong>{sentMsg}<Link to="/login">Sign In</Link>.</strong>
            </div>
        )
    } else {
        return (
            <React.Fragment>
                <div className="stPasswordHeader">
                    <h1>Enter your new password</h1>
                </div>
                <div className="stPasswordCredentials">
                    <div className="input-field">
                        <input className="browser-default validate" id="password1" type="password" name="password1" placeholder="New Password" required />
                    </div>
                    <div className="input-field">
                        <input className="browser-default validate" id="password2" type="password" name="password2" placeholder="Confirm Password" onBlur={passMatch} required />
                    </div>
                </div>
                <div className="stFormButtons">
                    <a href="#" className="stFormButton btn" onClick={sendReset}><em>Change password</em><FAIco icon="key"/></a>
                </div>
            </React.Fragment>
        )
    }
}

const LoginForm = ({submit, error, setLoginState, lostPwGo}) =>
    <React.Fragment>
        <div id="stLoginHeader" className="stFormHeader">
            <h1>Welcome! Please sign in</h1>
        </div>
        <div className="stLoginCredentials">
            <div className="input-field">
                <input className="browser-default validate" type="email" name="username" placeholder="Email Address" onBlur={setLoginState}/>
            </div>
            <div className="input-field">
                <input className="browser-default validate" type="password" name="password" placeholder="Password" onBlur={setLoginState}/>
            </div>
            {error.message ? <div className="stFormErrors">{error.message}</div> : null}
            <div className="stForgotBlock">
                <span><a href="#" onClick={lostPwGo}>Forgot your password?</a></span>
            </div>
        </div>
        <div className="stFormButtons">
            <a href="#" className="stFormButton btn" onClick={submit}><em>Sign In</em><FAIco icon="sign-in-alt"/></a>
        </div>
    </React.Fragment>

export { LoginForm, ResetForm, SendForm }