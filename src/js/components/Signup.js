import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import STStrippedWrapper from './STStrippedWrapper'
import {Plans,Account,Billing,Shipping,Pay} from './signup/steps'
import * as _st from '../classes/st'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.init = false
        this.state = {}
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
                <Route path='/signup/:step' render={(d) => console.log(d)} />
            </STStrippedWrapper>
        )
    }
}