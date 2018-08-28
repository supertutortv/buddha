import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import STStrippedWrapper from './STStrippedWrapper'
import { GlobalState } from '../utilities/StateContext'
import loginForm from './login/loginForm'
import lpwForm from './login/lpwForm'
import * as _st from '../classes/st'

export default class STAuthContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedIn : null,
            loading : true,
            fireRedirect : false,
            redirectTo : this.props.location.pathname,
            creds : {
                username : '',
                password : ''
            },
            error : {
                id : '',
                message : ''
            }
        }

        this.loginForm = loginForm.bind(this)
        this.lpwForm = lpwForm.bind(this)
        this.setLoginState = this.setLoginState.bind(this)
        this.submit = this.submit.bind(this)
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

    loginRedirect() {
        this.props.history.push('/login')
        return (
            this.loginForm()
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
                                        if (d.location.pathname === '/login/lostpw')
                                            return (this.lpwForm())
                                        else
                                            return (this.loginForm())
                                    }} />
                                    <Route path='/*' component={this.loginRedirect} />
                                </Switch>
                            </STStrippedWrapper>
                        )
                    }
                }}
            </GlobalState.Consumer>
        )
    }
}