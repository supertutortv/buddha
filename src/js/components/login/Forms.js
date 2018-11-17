import React from 'react'

const LoginForm = ({setLoginState, lostPwGo}) =>
    (<div>
        <div id="stLoginHeader" className="stFormHeader">
            <h1>Welcome! Please sign in.</h1>
        </div>
        <div className="stLoginCredentials">
            <div className="input-field">
                <input className="browser-default validate email" type="email" name="username" placeholder="Email Address" onBlur={setLoginState}/>
            </div>
            <div className="input-field">
                <input className="browser-default validate" type="password" name="password" placeholder="Password" onBlur={setLoginState}/>
            </div>
        </div>
        <div className="stFormButtons">
            <button className="stFormButton btn waves-effect waves-light">Sign In</button>
        </div>
        <div className="stForgotBlock">
            <span><a onClick={lostPwGo}>Forgot your password?</a></span>
        </div>
    </div>)

export { LoginForm }