import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import STStrippedWrapper from './STStrippedWrapper'
import Main from './Main'

export default class STAuthContainer extends React.Component {
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
    }

    componentDidMount() {
        if (_st.loggedIn === null) {
            _st.auth.verify((d) => {
                _st.loggedIn = d.data
                this.setState({
                    authResponse : d.data
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
        _st.auth.token(this.state.creds,(d) => {
            if (d.code === 'login_success') {
                this.setState({
                    creds: {}
                }, () => <Redirect to='/dashboard' />)
            }
        })
    }

    lostPwGo() {
        this.setState({
            lostPw : true
        }, () => this.props.history.push('/password/reset'))
    }

    render() {
        _st.loading = true
        if (_st.loggedIn === null) return null

        if (_st.loggedIn) {
            if (this.props.location.pathname === '/login') this.props.history.replace('/dashboard')
            return (
                <Main />
            )
        } else {
            if (this.props.location.pathname !== '/login') this.props.history.replace('/login')
            return (
                <STStrippedWrapper error={this.state.error}>
                    <Login />
                </STStrippedWrapper>
            )
        }
    }
}