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
        console.log(this.props)
        _st.loading()
    }

    componentDidMount() {
        if (this.state.loggedIn === null) {
            _st.auth.verify((d) => {
                this.setState({
                    loggedIn : d.data
                })
            })
        }
    }

    render() {
        if (this.state.loggedIn === null) return null
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