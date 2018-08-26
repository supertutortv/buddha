import React from 'react'
import {Redirect} from 'react-router-dom'
import {GlobalState} from '../utilities/StateContext'
import STStrippedWrapper from './STStrippedWrapper'
import * as _st from '../classes/st'

const BODY_CLASS =  'login'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            creds : {
                username : '',
                password : ''
            }
        }

        this.setLoginState = this.setLoginState.bind(this)
        this.submit = this.submit.bind(this)
    }

    setLoginState(e) {
        _st.form.setState(this.state.creds,e.target)
    }

    submit(e) {
        e.preventDefault()
        _st.auth.token(this.state.creds,(d) => {
            console.log(d)
        })
    }

    componentWillUnmount() {
        _st.bodyClass(BODY_CLASS)
    }

    componentDidMount() {
        _st.bodyClass(BODY_CLASS)
    }

    render() {
        return (
            <GlobalState.Consumer>
                {gstate => {
                    return (gstate.loggedIn) ? <Redirect to='/dashboard'/> : (
                        <STStrippedWrapper>
                            <form id="stLoginWrapper" className="stFormWrapper row" onSubmit={this.submit}>
                                <div className="stOverlay"></div>
                                <div id="stLoginHeader" className="stFormHeader col s12">
                                    <h2>Sign into your account</h2>
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
                                    <span><a href="/">Forgot your password?</a></span>
                                </div>
                                <div className="stFormButtons col s12">
                                    <button className="stFormButton pmt-button btn waves-effect waves-light">Login</button>
                                </div>
                            </form>
                        </STStrippedWrapper>
                    )
                }}
            </GlobalState.Consumer>
        )
    }
}