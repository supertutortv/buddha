import React from 'react'
import FAIco from '../FAIco'

const MyStudyList = ({data}) => {
    let list = []

    data.forEach((i) => list.push(
        <div className="stCourseStudyListItem">
            <picture>
                <img src={"https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F"+i.thumb+"_295x166.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"} />
            </picture>
        </div>
    ))

    return (
        <div className="stCourseMSL">
            <div className="stCourseStudyListHeading">My Study List</div>
            <div className="stCourseStudyList">
                <div className="stCourseStudyListInner">{list}</div>
            </div>
        </div>
    )
}

export default MyStudyList