import React from 'react'
import {Redirect} from 'react-router-dom'
import {GlobalState} from '../utilities/StateContext'
import * as _st from '../classes/st'

export default class StAuthContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn : false
        }
    }

    componentDidMount() {
        /* if (!st.state.loggedIn) {
            st.verifySession((d) => {
                st.setState({
                    loggedIn : d.data,
                    loading : false
                },() => st.loading())
            })
        } */
    }

    render() {
        console.log(_st, this.state)
    }
}