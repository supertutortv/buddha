import React from 'react'
import STDialogCentered from './STDialogCentered'
import { LoginForm } from './login/Forms'
import * as methods from './login/methods'

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

        Object.keys(methods).forEach((method) => {
            this[method] = methods[method].bind(this)
        })
    }

    componentDidMount() {
        _st.bodyClass = 'login'
        _st.loading = false
    }

    componentDidUpdate() {}

    componentWillReceiveProps(nextProps) {
        var { history: hist, location: loc } = nextProps
        if (hist.action === 'POP') this.setState(this.props.location.state)
    }

    render() {
        return (
            <STDialogCentered>
            <form id="stLoginWrapper" className="stFormWrapper" onSubmit={this.submit}>
                <LoginForm error={this.state.error} setLoginState={this.setLoginState} lostPwGo={this.lostPwGo} />
            </form>
            </STDialogCentered>
        )
    }
}