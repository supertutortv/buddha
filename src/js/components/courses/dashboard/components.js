import React from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'

export const DBStats = () => 
    <div className="stDashboardStats row">Stats row</div>

export const DBCourses = ({courses}) => {
    return (
        <div className="stDashboardCourses row">
            {Object.keys(courses).map((course) =>
                <div>
                    <Link to={'/'+course} />
                </div>
            )}
        </div>
    )
}