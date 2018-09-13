import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { DataState } from './courses/StateContext'

const Dashboard = () => {
    return(
        <DataState.Consumer>
            {(data) => {
                <div className="stDashboardCourses">
                    {Object.keys(data.courses).map((course) => <div>{course}</div>)}
                </div>
            }}
        </DataState.Consumer>
    )
}

export default Dashboard