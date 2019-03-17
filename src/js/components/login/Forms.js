import React from 'react'
import FAIco from '../FAIco'

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
            <div className="stForgotBlock">
                <span><a onClick={lostPwGo}>Forgot your password?</a></span>
            </div>
            {error.message ? <div className="stFormErrors">{error.message}</div> : null}
        </div>
        <div className="stFormButtons">
            <a href="#" className="stFormButton btn" onClick={submit}><em>Sign In</em><FAIco icon="sign-in-alt"/></a>
        </div>
    </React.Fragment>

export { LoginForm }