import React from 'react'

export const DBStats = () => 
    <div className="stDashboardStats row">Stats row</div>

export const DBCourses = ({courses}) => {
    return (
        <div className="stDashboardCourses row">
            {Object.keys(courses).map((course) => <div>{course}</div>)}
        </div>
    )
}