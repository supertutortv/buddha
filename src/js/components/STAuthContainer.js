import React from 'react'
import {GlobalState} from '../utilities/StateContext'
import Login from './Login'
import * as _st from '../classes/st'

export default class StAuthContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn : null,
            loading : true,
            fireRedirect : false,
            redirectTo : this.props.location.pathname
        }
    }

    componentDidMount() {
        if (this.state.loggedIn === null) {
            _st.auth.verify((d) => {
                this.setState({
                    loggedIn : d.data,
                    fireRedirect : true,
                    loading : false
                },(c) => console.log(c))
            })
        }
    }

    loginRedirect() {
        if (this.props.location.pathname === '/login') {
            return this.props.children
        } else {
            this.props.history.push('/login')
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