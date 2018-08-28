import React from 'react'
import { Redirect } from 'react-router-dom'
import * as _st from '../../classes/st'

export default function loginForm() {
    return (
        <form id="stLoginWrapper" className="stFormWrapper row" onSubmit={this.submit}>
            <div className="stOverlay"></div>
            <div id="stLoginHeader" className="stFormHeader col s12">
                <h2>Welcome! Please sign in.</h2>
                <span>You can access all of your test prep courses, as well as all of your account information, by logging in below.</span>
            </div>
            <div id="stLoginCredentials" className="col s12">
                <div className="input-field col s12">
                    <input className="browser-default validate email" type="email" name="username" placeholder="Email Address" onBlur={this.setLoginState}/>
                </div>
                <div className="input-field col s12">
                    <input className="browser-default validate" type="password" name="password" placeholder="Password" onBlur={this.setLoginState}/>
                </div>
            </div>
            <div className="stForgotBlock col s12">
                <span><a onClick={<Redirect to='/login/lostpw' />}>Forgot your password?</a></span>
            </div>
            <div className="stFormButtons col s12">
                <button className="stFormButton pmt-button btn waves-effect waves-light">Login</button>
            </div>
        </form>
    )
}