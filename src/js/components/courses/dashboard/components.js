import React from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'

export const DBNotifications = ({fetched, notes, openNote, dismissNote}) => 
    <div className="stDashboardNotifications">
        <div className="heading">Notifications</div>
        <div className={["stNotificationsBody",fetched ? 'visible' : 'hidden'].join(' ')}>
            {!fetched ? null : 
                (notes.length === 0) ? 
                    <div className="noNotes">No notifications to display</div> : 
                    <div className="stNotes">{
                        notes.map((o) => 
                            <div className="stNotification">
                                <div className="stNoteDate">{o.date}</div>
                                <div className="stNoteTitle"><span onClick={() => openNote(o.id)}>{o.title}</span></div>
                                <div className="stNoteDismiss"><span onClick={() => dismissNote(o.id)}>x</span></div>
                            </div>
                    )}</div>
            }
        </div>
    </div>

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