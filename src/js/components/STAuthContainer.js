import React from 'react'
import { GlobalState } from '../utilities/StateContext'
import login from './Login'
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
                message : '&nbsp;'
            }
        }

        this.loginForm = login.bind(this)
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

    loginRedirect() {
        if (this.props.location.pathname !== '/login') this.props.history.push('/login')
        return this.login()
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

    render() {
        if (this.state.loggedIn === null) return null
        _st.loading(this.state.loading)
        return (
            <GlobalState.Consumer>
                {this.state.loggedIn ? ((this.props.location.pathname === '/login') ? <Redirect to='/dashboard'/> : this.props.children) : this.loginRedirect()}
            </GlobalState.Consumer>
        )
    }
}