import React from 'react'
import { DataState } from './StateContext'
import ST404 from '../ST404'
import {Switch,Route,Redirect} from 'react-router-dom'

const Course = ({location: loc, history: hist, match, setState}) => {

    return(
        <DataState.Consumer>
            {(data) => {
                try {
                    const course = data.courses[match.params.course]
                    return (
                        <div>{JSON.stringify(course)}</div>
                    )
                } catch (e) {
                    return (
                        <ST404 />
                    )
                }
            }}
        </DataState.Consumer>
    )
}

export default Course