import React from 'react'
import { Link } from 'react-router-dom'

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
        </section>
    </div>

export const DBCourses = ({cancellation,courses,user}) => {
    return (
        <div className="stDashboardCourses">
            <st-courses-body>
                {courses.length === 0 ? null : 
                Object.keys(courses).map((course) => {
                    let crs = courses[course]
                    return (
                        <st-course-card>
                            <st-course-card-inner>
                                <Link to={'/'+course} >
                                    <st-course-card-img>
                                        <img src={crs.thumb} />
                                    </st-course-card-img>
                                    <st-course-card-title>
                                        <span>{crs.name}</span>
                                    </st-course-card-title>
                                </Link>
                                {!crs.trialing ? 
                                    null :
                                    (<st-course-status>
                                        <a href="/#!/actionActivate" className="stCourseButton endTrial activate" onClick={(e) => cancellation(e,{
                                            action: 'activate',
                                            ...user
                                        })}><em>Activate full course</em></a>
                                        <a href="/#!/actionCancel" className="stCourseButton cancel" onClick={(e) => cancellation(e,{
                                            action: 'cancel',
                                            ...user
                                        })}><em>Cancel</em></a>
                                    </st-course-status>
                                )}
                            </st-course-card-inner>
                        </st-course-card>
                    )}
                )}
            </st-courses-body>
        </div>
    )
}