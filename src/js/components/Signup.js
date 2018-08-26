import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import STStrippedWrapper from './STStrippedWrapper'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.init = false
        this.state = {}
        console.log(this.props)
    }
    render() {
        return(
            <STStrippedWrapper>
                <div>Signup page</div>
            </STStrippedWrapper>
        )
    }
}