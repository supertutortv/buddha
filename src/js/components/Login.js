import React from 'react'
import { Link } from 'react-router-dom'
import * as methods from './login/methods'

const thedate = new Date

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
        _st.bodyClass = 'gateway login'
        _st.loading = false
    }

    componentDidUpdate() {}

    componentWillReceiveProps(nextProps) {
        var { history: hist, location: loc } = nextProps
        if (hist.action === 'POP') this.setState(this.props.location.state)
    }

    render() {
        let {error} = this.state,
            {history: hist} = this.props

        return (
            <React.Fragment>
                <form role="form" className="stAccountForm" onSubmit={this.submit}>
                    <header className="heading">
                        <h1>SupertutorTV</h1>
                    </header>
                    <fieldset className="stAccountBody">
                        <div className="stIfR99">
                            <input autocomplete="off" aria-label="Email Address" className="validate email" type="email" name="email" required validation="email"/>
                            <label aria-hidden="true" for="email">Email Address</label>
                        </div>
                        <div className="stIfR99">
                            <input autocomplete="off" aria-label="Password" className="browser-default validate" type="password" name="password" required/>
                            <label aria-hidden="true" for="password">Password</label>
                            <section className="stForgotBlock"><Link to='/password/reset'>Forgot?</Link></section>
                        </div>
                    </fieldset>
                    <div className="stAccountButtons">
                        <button type="submit" className="stAccountButton btn" ><span>Log in</span></button>
                    </div>
                    {(error.message)
                        ? <div className="stAccountErrors"><strong>{error.message}</strong></div>
                        : null
                    }
                </form>
                <code className="insteadLogin">Don't have an account? <Link to={'/signup'+hist.location.search}>Sign Up</Link></code>
            </React.Fragment>
        )
    }
}