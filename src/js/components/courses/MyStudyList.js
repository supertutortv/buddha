import React from 'react'
import FAIco from '../FAIco'

const MyStudyList = ({data}) =>
    <div className="stCourseMSL">
        <div className="stCourseStudyListHeading">My Study List</div>
        <div className="stCourseStudyList">{JSON.stringify(data)}</div>
    </div>

export default MyStudyList