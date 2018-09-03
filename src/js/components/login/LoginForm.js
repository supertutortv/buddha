import React, { Component } from 'react'

const LoginForm = ({setLoginState, lostPwGo}) =>
    (<div>
        <div id="stLoginHeader" className="stFormHeader col s12">
            <h2>Welcome! Please sign in.</h2>
            <span>You can access all of your test prep courses, as well as all of your account information, by logging in below.</span>
        </div>
        <div id="stLoginCredentials" className="col s12">
            <div className="input-field col s12">
                <input className="browser-default validate email" type="email" name="username" placeholder="Email Address" onBlur={setLoginState}/>
            </div>
            <div className="input-field col s12">
                <input className="browser-default validate" type="password" name="password" placeholder="Password" onBlur={setLoginState}/>
            </div>
        </div>
        <div className="stForgotBlock col s12">
            <span><a onClick={lostPwGo}>Forgot your password?</a></span>
        </div>
        <div className="stFormButtons col s12">
            <button className="stFormButton pmt-button btn waves-effect waves-light">Login</button>
        </div>
    </div>)

export default LoginForm