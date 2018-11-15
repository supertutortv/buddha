import React from 'react'
import FAIco from '../FAIco'
import VidPlayer from '../VidPlayer'

export default class MyStudyList extends React.Component {
    constructor(props) {
        super(props)

        this.playlist = this.props.data

        this.state = {
            video : this.playlist[0].vidid
        }

        this.changeVid = this.changeVid.bind(this)
    }

    changeVid(vid) {
        this.setState()
    }

    render() {
        let { playlist } = this,
            list = []

        playlist.forEach((i) => list.push(
            <div className="stCourseStudyListItem">
                <picture>
                    <img src={"https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F"+i.thumb+"_295x166.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"} />
                </picture>
            </div>
        ))
        return (
            <div className="stCourseTop">
                <div className="stCourseIntro">
                    <VidPlayer showTitle autoplay={false} video={this.state.video} />
                </div>
                <div className="stCourseMSL">
                    <div className="stCourseMSLInner">
                        <div className="stCourseStudyListHeading">My Study List</div>
                        <div className="stCourseStudyList">
                            <div className="stCourseStudyListInner">{list}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}