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

    }

    changeVid(vid) {
        this.setState({video: vid})
    }

    render() {
        let { playlist } = this,
            list = []

        playlist.forEach((i) => list.push(
            <div className="stCourseStudyListItem" onClick={this.changeVid(i.vidid)}>
                <img src={"https://i.vimeocdn.com/video/"+i.thumb+"_295x166.jpg?r=pad"} />
                <div class="listItemTitle">{i.name}</div>
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