import React from 'react'
import {Redirect} from 'react-router-dom'
import {GlobalState} from '../../utilities/StateContext'

export default class StAuthContainer extends React.Component {
    componentDidMount() {
        let st = this.props.st

        if (!st.state.loggedIn) {
            st.verifySession((d) => {
                st.setState({
                    loggedIn : d.data,
                    loading : false
                },() => st.loading())
            })
        }
    }

    render() {
        var st = this.props.st
        if (st.state.loggedIn) {
            st.loading()
            return this.props.children
        } else {
            return null
        }
    }
}