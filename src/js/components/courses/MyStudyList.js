import React from 'react'
import FAIco from '../FAIco'

const MyStudyList = ({data}) => {
    let list = []

    data.forEach((i) => list.push(<div>{JSON.stringify(i)}</div>))

    return (
        <div className="stCourseMSL">
            <div className="stCourseStudyListHeading">My Study List</div>
            <div className="stCourseStudyList">{list}</div>
        </div>
    )
}

export default MyStudyList