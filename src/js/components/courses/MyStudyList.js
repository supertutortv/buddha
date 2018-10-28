import React from 'react'
import FAIco from '../FAIco'

const MyStudyList = ({data}) =>
    <div className="stCourseMSL">
        <div className="stCourseStudyListHeading">My Study List</div>
        <div className="stCourseStudyList">{
            () => {
                return data.forEach((i) => <div>{JSON.stringify(i)}</div>)
            }
        }</div>
    </div>

export default MyStudyList