import React from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'

export const DBStats = () => 
    <div className="stDashboardStats"></div>

export const DBCourses = ({courses}) => {
    return (
        <div className="stDashboardCourses">
            <div className="myCoursesHeader heading">My Courses</div>
            <div className="myCoursesBody">
                {Object.keys(courses).map((course) => {
                    let crs = courses[course]
                    return (
                        <div className="course">
                            <Link to={'/'+course} >
                                <img src={crs.thumb} />
                                <div className="title">
                                    <span>{crs.name}</span>
                                </div>
                            </Link>
                        </div>
                    )}
                )}
            </div>
        </div>
    )
}