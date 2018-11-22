import React from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'

export const DBStats = () => 
    <div className="stDashboardStats">If you'd like to unlock the full course or cancel your subscription before being charged and you don't see the buttons below (in the "Actions" section), please email us at info@supertutortv.com</div>

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

export const DBActions = ({d,cancellation}) => {
    return (
        <div className="stDashboardActions">
            <div className="heading">Actions</div>
            <div className="stDBActionsBody">
            {!d.trialing ? <span>No actions currently available.</span> : (
                <React.Fragment>
                    <button className="stTrialCancelButton" onClick={() => cancellation({
                        action: 'trial',
                        ...d
                    })}>Unlock the course</button>
                    <button className="stTrialCancelButton" onClick={() => cancellation({
                        action: 'subscription',
                        ...d
                    })}>Cancel Subscription</button>
                </React.Fragment>
            )}
            </div>
        </div>
    )
}