import React from 'react'
import STStrippedWrapper from './STStrippedWrapper'
import LoginForm from './login/LoginForm'
import ResetPassword from './login/ResetPassword'

export default class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            lostPw : false,
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
    }

    componentDidMount() {
        _st.bodyClass = 'login'
    }

    render() {
        _st.loading = false
        return (
            <STStrippedWrapper error={this.state.error}>
            <form id="stLoginWrapper" className="stFormWrapper row" onSubmit={this.submit}>
                <div className="stOverlay"></div>
                {() => this.state.lostPw ? 
                    <ResetPassword setLoginState={this.setLoginState}/> : 
                    <LoginForm setLoginState={this.setLoginState} lostPwGo={this.lostPwGo}/>
                }
            </form>
            </STStrippedWrapper>
        )
    }
}

/* export default Login = auth => {
    if (auth.state.lostPw)
        return (
            <form id="stLoginWrapper" className="stFormWrapper row" onSubmit={auth.submit}>
                <div className="stOverlay"></div>
                <div id="stLoginHeader" className="stFormHeader col s12">
                    <h2>Reset your password</h2>
                    <span>Please enter the email address associated with your account</span>
                </div>
                <div id="stLoginCredentials" className="col s12">
                    <div className="input-field col s12">
                        <input className="browser-default validate email" type="email" name="username" placeholder="Email Address" onBlur={auth.setLoginState}/>
                    </div>
                </div>
                <div className="stFormButtons col s12">
                    <button className="stFormButton pmt-button btn waves-effect waves-light">Reset your password</button>
                </div>
            </form>
        )
    else
        
    } */