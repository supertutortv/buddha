import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import STStrippedWrapper from './STStrippedWrapper'

const ResetPassword = ({setLoginState}) => 
    (<div>
        <div id="stLoginHeader" className="stFormHeader col s12">
            <h2>Reset your password</h2>
            <span>Please enter the email address associated with your account</span>
        </div>
        <div id="stLoginCredentials" className="col s12">
            <div className="input-field col s12">
                <input className="browser-default validate email" type="email" name="username" placeholder="Email Address" onBlur={setLoginState}/>
            </div>
        </div>
        <div className="stFormButtons col s12">
            <button className="stFormButton pmt-button btn waves-effect waves-light">Reset your password</button>
        </div>
    </div>)

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

export default class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            lostPw : false,
            resetSent : false,
            creds : {
                username : '',
                password : ''
            },
            error : {
                id : '',
                message : ''
            },
            authResponse : ''
        }

        this.props.location.state = this.state

        this.setLoginState = this.setLoginState.bind(this)
        this.submit = this.submit.bind(this)
        this.lostPwGo = this.lostPwGo.bind(this)
    }

    componentDidMount() {
        _st.bodyClass = 'login'
    }

    componentDidUpdate() {
        _st.loading = false
    }

    componentWillReceiveProps(nextProps) {
        if (typeof this.props.location.state !== 'undefined') this.setState(this.props.location.state)
    }

    setLoginState(e) {
        _st.form.setState(this.state.creds,e.target)
    }

    lostPwGo() {
        _st.loading = true
        this.setState((prev) => {
            this.props.history.push({
                pathname: '/auth/resetpw',
                state: prev
            })
            return {lostPw : true}
        })
    }

    submit(e) {
        e.preventDefault()
        _st.loading = true
        _st.auth.submit(this.props.location.pathname,this.state.creds,(d) => {
            if (d.code === 'login_success') {
                this.props.setLoggedIn()
            }
        })
    }

    render() {
        console.log(this.props.location)
        _st.loading = false
        return (
            <STStrippedWrapper error={this.state.error}>
            <form id="stLoginWrapper" className="stFormWrapper row" onSubmit={this.submit}>
                <div className="stOverlay"></div>
                {this.state.lostPw ? 
                    <ResetPassword resetSent={this.state.resetSent} setLoginState={this.setLoginState} /> : 
                    <LoginForm setLoginState={this.setLoginState} lostPwGo={this.lostPwGo} />
                }
            </form>
            </STStrippedWrapper>
        )
    }
}