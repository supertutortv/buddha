import React from 'react'
import { DataState } from './StateContext'
import ST404 from '../ST404'
import {Switch,Route,Redirect} from 'react-router-dom'

const Course = ({location: loc, history: hist, match, setState}) => {
    const { params } = match
    console.log(params)
    return(
        <DataState.Consumer>
            {(data) => {
                if (!(params.course in data.courses))
                    return (
                        <ST404 />
                    )
                else
                console.log(Object.values(params).reduce((obj,val) => obj[val], data.courses))
                return null
            }}
        </DataState.Consumer>
    )
}

export default Course