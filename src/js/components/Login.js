import React from 'react'
import STDialogCentered from './STDialogCentered'
import { LoginForm } from './login/Forms'
import * as methods from './login/methods'

export default class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            creds : {
                username : '',
                password : ''
            },
            init: false,
            sent: false,
            reset: false,
            resetSent : false,
            key: props.match.params.key || null,
            sentMsg: '',
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
        let {match, history: hist} = this.props

        if (match.path === '/password/reset/:key?') {
            _st.bodyClass = 'passwordReset'
            if (this.state.key !== null) {
                _st.http.get('/auth/reset?key='+match.params.key,(d) => {
                    if (d.code === 'pwError') {
                        alert('The reset link is invalid. Please click "OK" and try again.')
                        hist.replace('/password/reset')
                        return window.location.reload(true)
                    }

                    this.setState({
                        init: 'pwd',
                        reset: true,
                        key: match.params.key
                    })
                })
            } else {
                this.setState({init:'pwd'})
            }
        } else {
            _st.bodyClass = 'login'
            this.setState({init:'login'})
        }
    }

    componentDidUpdate() {}

    componentWillReceiveProps(nextProps) {
        var { history: hist, location: loc } = nextProps
        if (hist.action === 'POP') this.setState(this.props.location.state)
    }

    render() {
        let {key,init} = this.state
        if (false === init) return null

        return (
            <STDialogCentered>
                {init === 'pwd' ?
                    <form id="stPasswordWrapper" className="stFormWrapper" onSubmit={this.sendReset}>
                        {key ? <ResetForm {...this.state} passMatch={this.passMatch}/> : <SendForm {...this.state} />}
                    </form> :
                    <form id="stLoginWrapper" className="stFormWrapper">
                        <LoginForm submit={this.submit} error={this.state.error} setLoginState={this.setLoginState} lostPwGo={this.lostPwGo}/>
                    </form>
                }
            </STDialogCentered>
        )
    }
}