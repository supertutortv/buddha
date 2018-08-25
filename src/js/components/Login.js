import React from 'react'
import {Redirect} from 'react-router-dom'
import {GlobalState} from '../utilities/StateContext'
import * as _st from '../classes/st'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username : '',
            password : '',
            skipLogin : false
        }
    }

    setState(e) {
        console.log(e.target)
    }

    componentDidMount() {}

    render() {
        return this.state.skipLogin ? (<Redirect to='/dashboard'/>) : (
            <form id="stLoginWrapper" className="stFormWrapper row">
                <div className="stOverlay"></div>
                <div id="stLoginHeader" className="stFormHeader col s12">
                    <h2>Sign into your account</h2>
                    <span>You can access all of your test prep courses, as well as all of your account information, by logging in below.</span>
                </div>
                <div id="stLoginCredentials" className="col s12">
                    <div className="input-field col s12">
                        <input className="browser-default validate email" type="email" name="st-username" placeholder="Email Address" onBlur={this.setState}/>
                    </div>
                    <div className="input-field col s12">
                        <input className="browser-default validate" type="password" name="st-password" placeholder="Password" onBlur={this.setState}/>
                    </div>
                </div>
                <div className="stForgotBlock col s12">
                    <span><a href="/">Forgot your password?</a></span>
                </div>
                <div className="stFormButtons col s12">
                    <button className="stFormButton pmt-button btn waves-effect waves-light">Login</button>
                </div>
            </form>
        )
    }
}