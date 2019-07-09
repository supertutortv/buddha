import React from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'

export const DBNotifications = ({fetched, notes, openNote, dismissNote}) => 
    <div className="stDashboardNotifications">
        <section>
            <div className="stBoxHeading">Notifications</div>
            <div className={["stNotificationsBody",fetched ? 'visible' : 'hidden'].join(' ')}>
                {!fetched ? null : 
                    (notes.length === 0) ? 
                        <div className="noNotes">You have zero notifications</div> : 
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
            <div><button onClick={(e) => {
                e.preventDefault()
                fetch('https://us-central1-supertutortv-1deda.cloudfunctions.net/getCoupons')
                .then((res) => console.log(res.json()))
            }}>Get Coupons</button></div>
        </section>
    </div>

export const DBCourses = ({cancellation,courses,user}) => {
    return (
        <div className="stDashboardCourses">
            <div className="stCoursesBody">
                {courses.length === 0 ? null : 
                Object.keys(courses).map((course) => {
                    let crs = courses[course]
                    return (
                        <div className="course">
                            <Link to={'/'+course} >
                                <div className="heroImg">
                                    <img src={crs.thumb} />
                                </div>
                                <div className="title">
                                    <span>{crs.name}</span>
                                </div>
                                {!crs.trialing ? 
                                    <div className="stCourseStatus">Status: <span class="active">Active</span></div> : (
                                    <React.Fragment>
                                        <button className="stCourseButton endTrial" onClick={(e) => cancellation(e,{
                                            action: 'trial',
                                            ...user
                                        })}>Unlock the course</button>
                                        <button className="stCourseButton cancel" onClick={(e) => cancellation(e,{
                                            action: 'subscription',
                                            ...user
                                        })}>Cancel</button>
                                    </React.Fragment>
                                )}
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
            <section>
                <div className="stBoxHeading">Actions</div>
                <div className="stDBActionsBody"></div>
            </section>
        </div>
    )
}