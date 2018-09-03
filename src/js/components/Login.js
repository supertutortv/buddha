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

        this.setLoginState = this.setLoginState.bind(this)
        this.submit = this.submit.bind(this)
        this.lostPwGo = this.lostPwGo.bind(this)

        console.log(this.props)
    }

    componentDidMount() {
        _st.bodyClass = 'login'
    }

    setLoginState(e) {
        console.log(e.target)
    }

    lostPwGo() {
        this.setState({
            lostPw : true
        }, () => this.props.history.push('/password/reset'))
    }

    submit(e) {
        e.preventDefault()
        console.log(e.target)
        /* _st.auth.token(this.state.creds,(d) => {
            if (d.code === 'login_success') {
                this.setState({
                    creds: {}
                }, () => <Redirect to='/dashboard' />)
            }
        }) */
    }

    render() {
        _st.loading = false
        return (
            <STStrippedWrapper error={this.state.error}>
            <form id="stLoginWrapper" className="stFormWrapper row" onSubmit={this.submit}>
                <div className="stOverlay"></div>
                {() => this.state.lostPw ? <ResetPassword setLoginState={this.setLoginState} /> : <LoginForm setLoginState={this.setLoginState} lostPwGo={this.lostPwGo} />}
            </form>
            </STStrippedWrapper>
        )
    }
}