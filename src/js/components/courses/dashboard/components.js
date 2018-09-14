import React from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'

export const DBStats = () => 
    <div className="stDashboardStats row">Stats row</div>

export const DBCourses = ({data}) => {
    return (
        <div className="stDashboardCourses row">
            {Object.keys(data).map((course) =>
                <div>
                    <Link to={'/'+course} >{data[course].name}</Link>
                </div>
            )}
        </div>
    )
}