import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import STStrippedWrapper from './STStrippedWrapper'
import * as _st from '../classes/st'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.init = false
        this.state = {}
        console.log(this.props)
    }

    componentWillUnmount() {
        _st.bodyClass('signup')
    }

    componentDidMount() {
        _st.bodyClass('signup')
    }

    render() {
        return(
            <STStrippedWrapper>
                <div>Signup page</div>
            </STStrippedWrapper>
        )
    }
}