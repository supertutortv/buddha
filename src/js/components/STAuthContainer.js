import React from 'react'
import {Redirect} from 'react-router-dom'
import {GlobalState} from '../utilities/StateContext'
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
                })
            })
        }
    }

    render() {
        _st.loading(this.state.loading)
        console.log(this.state)
        if (this.state.loggedIn === null) return null
        if (this.state.loggedIn) {
            return (
                <GlobalState.Provider value={this.state}>
                    {this.props.children}
                </GlobalState.Provider>
            )
        } else {
            return (
                <GlobalState.Provider value={this.state}>
                    <Redirect to='/login' />
                </GlobalState.Provider>
            )
        }
    }
}