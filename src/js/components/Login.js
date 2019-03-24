import React from 'react'
import STDialogCentered from './STDialogCentered'
import { LoginForm, ResetForm, SendForm } from './login/Forms'
import * as methods from './login/methods'

export default class Login extends React.Component {
    constructor(props) {
        super(props)

        let key = props.match.params.key

        this.state = {
            creds : {
                username : '',
                password : ''
            },
            init: false,
            sent: false,
            reset: false,
            resetSent : false,
            key: key || null,
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
        _st.bodyClass = 'login'
        let {match, history: hist} = this.props

        if (match.path === '/password/reset/:key?') {
            let key = null
            if (this.state.key !== null) {
                _st.http.get('/auth/reset?key='+match.params.key,(d) => {
                    if (d.code === 'pwError') {
                        alert('The reset link is invalid. Please click "OK" and try again.')
                        hist.replace('/password/reset')
                        return window.location.reload(true)
                    }
                    key = match.params.key
                })
            }

            this.setState({
                init: 'pwd',
                reset: true,
                key: key
            })
        } else {
            this.setState({init:'login'})
        }
    }

    componentDidUpdate() {}

    componentWillReceiveProps(nextProps) {
        let { history: hist, location: loc } = nextProps
        if (hist.action === 'POP') this.setState(this.props.location.state)
    }

    render() {
        let {key,init} = this.state,
            {match,history: hist} = this.props

        if (0 > match.path.indexOf('/login') && 0 > match.path.indexOf('/password/reset')) hist.replace('/login')
        if (false === init) return null
        
        return (
            <STDialogCentered>
                {init === 'pwd' ?
                    <form id="stPasswordWrapper" className="stFormWrapper">
                        {console.log(key)}
                        {key ? <ResetForm {...this.state} sendReset={this.sendReset} passMatch={this.passMatch}/> : <SendForm sendReset={this.sendReset} {...this.state} />}
                    </form> :
                    <form id="stLoginWrapper" className="stFormWrapper">
                        <LoginForm submit={this.submit} error={this.state.error} setLoginState={this.setLoginState} lostPwGo={this.lostPwGo}/>
                    </form>
                }
            </STDialogCentered>
        )
    }
}