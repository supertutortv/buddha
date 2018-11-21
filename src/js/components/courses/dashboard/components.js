import React from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'

export const DBStats = () => 
    <div className="stDashboardStats">If you'd like to end your trial period and start with the full course right away, or cancel your subscription before being charged, please email us at info@supertutortv.com</div>

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

export const DBActions = ({d}) => {
    console.log(d)
    return !d.trialing ? null : (
        <div className="stDashboardActions">
            <div className="heading">Actions</div>
            <div className="stDBActionsBody"></div>
        </div>
    )
}