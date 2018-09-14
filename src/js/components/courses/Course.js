import React from 'react'
import { DataState } from './StateContext'
import ST404 from '../ST404'
import {Switch,Route,Redirect} from 'react-router-dom'

const Course = ({location: loc, history: hist, match, setState}) => {

    return(
        <DataState.Consumer>
            {(data) => {
                console.log(Object.entries(data.courses))
                return null
            }}
        </DataState.Consumer>
    )
}

export default Course