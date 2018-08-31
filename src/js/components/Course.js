import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

export default class Course extends React.Component {
    render() {
        return(
            <div>{JSON.stringify(this.props)}</div>
        )
    }
}