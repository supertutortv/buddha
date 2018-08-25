import React from 'react'
import {GlobalState} from '../utilities/StateContext'
import Login from './Login'
import * as _st from '../classes/st'

export default class STAuthContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn : null,
            loading : true,
            fireRedirect : false,
            redirectTo : this.props.location.pathname
        }
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
        if (this.props.location.pathname === '/login') {
            console.log('not redirected')
            return this.props.children
        } else {
            this.props.history.push('/login')
            console.log('redirected')
            return (
                <Login />
            )
        }
    }

    render() {
        if (this.state.loggedIn === null) return null
        _st.loading(this.state.loading)
        return (
            <GlobalState.Provider value={this.state}>
                {this.state.loggedIn ? this.props.children : this.loginRedirect()}
            </GlobalState.Provider>
        )
    }
}