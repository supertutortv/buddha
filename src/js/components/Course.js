import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

export default class Course extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeObj : {}
        }

        /* let {params} = this.props.match
        Object.keys(params) */
    }

    componentDidMount() {}

    render() {
        if (this.state.activeObj === null) return null
        return(
            <div>{JSON.stringify(this.props.match)}</div>
        )
    }
}