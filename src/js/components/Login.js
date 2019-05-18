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
            <React.Fragment>
                <main className="stGatewayForm">
                    <div className="stGatewayFormInner">
                        <form role="form" className="stAccountForm" onSubmit={this.createAccount}>
                            <header className="heading">
                                <h1>SupertutorTV</h1>
                            </header>
                            <fieldset className="stAccountBody">
                                <div className="stIfR99">
                                    <input autocomplete="off" aria-label="Email" className="browser-default validate email" type="email" name="email" required validation="email"/>
                                    <label aria-hidden="true" for="email">Student Email</label>
                                </div>
                                <div className="stIfR99">
                                    <input autocomplete="off" aria-label="Password" className="browser-default validate" type="password" name="password" required/>
                                    <label aria-hidden="true" for="password">Password</label>
                                </div>
                            </fieldset>
                            <div className="stAccountButtons">
                                <button type="submit" className="stAccountButton btn" ><span>Log in</span></button>
                            </div>
                            {(error.message)
                                ? <div className="stAccountErrors"><strong>{error.message}</strong></div>
                                : null
                            }
                            <section className="stForgotBlock">Forgot?</section>
                        </form>
                        <code className="insteadLogin">Don't have an account? <Link to={'/signup'+hist.location.search}>Sign Up</Link></code>
                    </div>
                </main>
                <footer role="contentinfo">
                    <mark>© {thedate.getFullYear()} Supertutor Media, Inc.</mark>
                    <nav>Some links</nav>
                </footer>
            </React.Fragment>
        )
        return (
            <STDialogCentered error={this.state.error}>
            <form id="stLoginWrapper" className="stFormWrapper" onSubmit={this.submit}>
                <LoginForm setLoginState={this.setLoginState} lostPwGo={this.lostPwGo} />
            </form>
            </STDialogCentered>
        )
    }
}