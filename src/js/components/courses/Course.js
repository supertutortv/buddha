import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

const Course = (props) => {
    console.log(props)
    return(
        <DataState.Consumer>
            {(data) => {
                return null
            }}
        </DataState.Consumer>
    )
}

export default Course