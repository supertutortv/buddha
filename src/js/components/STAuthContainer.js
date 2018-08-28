import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import STStrippedWrapper from './STStrippedWrapper'
import { GlobalState } from '../utilities/StateContext'
import * as _st from '../classes/st'

export default class STAuthContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedIn : null,
            loading : true,
            fireRedirect : false,
            redirectTo : this.props.location.pathname,
            lostPw : false,
            creds : {
                username : '',
                password : ''
            },
            error : {
                id : '',
                message : ''
            }
        }

        this.loginForm = this.loginForm.bind(this)
        this.loginRedirect = this.loginRedirect.bind(this)
        this.setLoginState = this.setLoginState.bind(this)
        this.submit = this.submit.bind(this)
        this.lostPwGo = this.lostPwGo.bind(this)
        _st.loading()
    }

    componentDidMount() {
        if (this.state.loggedIn === null) {
            _st.auth.verify((d) => {
                this.setState({
                    loggedIn : d.data,
                    fireRedirect : true,
                    loading : false
                })
            })
        }
    }

    shouldComponentUpdate(nextProps) {
        return (nextProps.location.pathname === this.props.location.pathname)
    }

    setLoginState(e) {
        _st.form.setState(this.state.creds,e.target)
    }

    submit(e) {
        e.preventDefault()
        /* _st.auth.token(this.state.creds,(d) => {
            console.log(d)
        }) */
    }

    lostPwGo() {
        this.props.history.push('/login/lostpw')
        this.setState({
            lostPw : true
        })
    }

    loginRedirect(d) {
        Object.assign(this.state,{
            fireRedirect : true,
            redirectTo : d.match.url
        })
        console.log(this.state)
        this.props.history.push('/login')
        return (
            this.loginForm()
        )
    }

    loginForm(d) {
        if (this.state.lostPw)
            return (
                <form id="stLoginWrapper" className="stFormWrapper row" onSubmit={this.submit}>
                    <div className="stOverlay"></div>
                    <div id="stLoginHeader" className="stFormHeader col s12">
                        <h2>Reset your password</h2>
                        <span>Please enter the email address associated with your account</span>
                    </div>
                    <div id="stLoginCredentials" className="col s12">
                        <div className="input-field col s12">
                            <input className="browser-default validate email" type="email" name="username" placeholder="Email Address" onBlur={this.setLoginState}/>
                        </div>
                    </div>
                    <div className="stFormButtons col s12">
                        <button className="stFormButton pmt-button btn waves-effect waves-light">Reset your password</button>
                    </div>
                </form>
            )
        else
            return (
                <form id="stLoginWrapper" className="stFormWrapper row" onSubmit={this.submit}>
                    <div className="stOverlay"></div>
                    <div id="stLoginHeader" className="stFormHeader col s12">
                        <h2>Welcome! Please sign in.</h2>
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
                        <span><a onClick={this.lostPwGo}>Forgot your password?</a></span>
                    </div>
                    <div className="stFormButtons col s12">
                        <button className="stFormButton pmt-button btn waves-effect waves-light">Login</button>
                    </div>
                </form>
            )
    }

    render() {
        if (this.state.loggedIn === null) return null
        _st.loading(this.state.loading)
        return (
            <GlobalState.Consumer>
                {context => {
                    if (this.state.loggedIn) {
                        return (this.props.location.pathname === '/login') ? <Redirect to='/dashboard'/> : this.props.children
                    } else {
                        context.bodyClass('login')
                        return (
                            <STStrippedWrapper error={this.state.error}>
                                <Switch>
                                    <Route path='/login' render={(d) => {
                                        this.loginForm(d)
                                    }}/>
                                    <Route path='/*' render={(d) => this.loginRedirect(d)} />
                                </Switch>
                            </STStrippedWrapper>
                        )
                    }
                }}
            </GlobalState.Consumer>
        )
    }
}