import React from 'react'
import {Redirect} from 'react-router-dom'
import {GlobalState} from '../utilities/StateContext'
import * as _st from '../classes/st'

export default class StAuthContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn : null,
            fireRedirect : false,
            redirectTo : '/login'
        }
    }

    componentDidMount() {
        if (this.state.loggedIn === null) {
            _st.auth.verify((d) => {
                this.setState({
                    loggedIn : d.data
                },() => _st.loading())
            })
        }
    }

    render() {
        if (this.state.loggedIn === null) return null
        _st.loading()
        if (this.state.loggedIn) {
            return (
                <GlobalState.Provider value={this.state}>
                    {this.props.children}
                </GlobalState.Provider>
            )
        } else {
            return (
                <Redirect to='/login' />
            )
        }
    }
}