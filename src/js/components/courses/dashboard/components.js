import React from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'

export const DBStats = () => 
    <div className="stDashboardStats"></div>

export const DBCourses = ({courses}) => {
    return (
        <div className="stDashboardCourses">
            <div className="myCoursesHeader">My Courses</div>
            <div className="myCoursesBody">
                {Object.keys(courses).map((course) => {
                    return (
                        <div className="course">
                            <Link to={'/'+course} >{courses[course].name}</Link>
                        </div>
                    )}
                )}
            </div>
        </div>
    )
}