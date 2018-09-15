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
                var activeObj = {}

                try {
                    Object.entries(params).reduce((obj,val) => {
                        console.log(typeof val[1])
                        if (typeof val[1] !== 'undefined') return activeObj = obj[val[0][val[1]]]
                    }, data)
                    console.log(activeObj)
                    return null
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