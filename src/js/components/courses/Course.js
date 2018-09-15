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
                var crss = data.courses

                try {
                    Object.values(params).filter(par => par !== undefined).reduce((obj,val) => {
                        if (typeof obj[val] !== 'undefined') return crss = obj[val]
                    }, crss)
                    console.log(crss)
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