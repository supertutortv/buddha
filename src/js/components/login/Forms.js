import React from 'react'

const LoginForm = ({setLoginState, lostPwGo}) =>
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
        </div>
        <div className="stFormButtons">
            <input type="submit" value="Sign In" className="stFormButton btn waves-effect waves-light"/>
        </div>
    </React.Fragment>

export { LoginForm }