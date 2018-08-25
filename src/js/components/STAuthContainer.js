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
        /* if (!this.state.loggedIn) {
            _st.auth.verify((d) => {
                this.setState({
                    loggedIn : d.data
                },() => _st.loading())
            })
        } */
    }

    render() {
        console.log(this.props)
        if (this.state.loggedIn) {
            return this.props.children
        } else {
            return null
        }
    }
}