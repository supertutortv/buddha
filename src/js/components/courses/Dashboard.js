import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { DataState } from './StateContext'
import { DBCourses } from './dashboard/components'

const Dashboard = () => {
    return(
        <DataState.Consumer>
            {(data) => {
                return (
                    <DBCourses courses={data.courses} />
                )
            }}
        </DataState.Consumer>
    )
}

export default Dashboard