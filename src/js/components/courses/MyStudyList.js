import React from 'react'
import FAIco from '../FAIco'
import VidPlayer from '../VidPlayer'
import ToggleSwitch from '../pieces/toggleSwitch'

export default class MyStudyList extends React.Component {
    constructor(props) {
        super(props)

        this.playlist = this.props.data

        this.state = {
            video : this.playlist[0].vidid,
            autoplay: false
        }

    }

    changeVid(vid) {
        this.setState({video: vid})
    }

    render() {
        console.log(this.props.autoplay)
        let { playlist } = this,
            list = []

        playlist.forEach((i) => {
            let clsHl = (this.state.video === i.vidid) ? ' highlight' : ''
            list.push(
                <div className={"stCourseStudyListItem"+clsHl} onClick={() => this.changeVid(i.vidid)}>
                    <img src={"https://i.vimeocdn.com/video/"+i.thumb+"_295x166.jpg?r=pad"} />
                    <div class="listItemTitle">{i.name}</div>
                </div>
            ) 
        })
        return (
            <div className="stCourseTop">
                <div className="stCourseIntro">
                    <VidPlayer video={this.state.video} />
                </div>
                <div className="stCourseMSL">
                    <div className="stCourseMSLInner">
                        <div className="stCourseStudyListHeading">My Study List</div>
                        <div className="stCourseStudyList">
                            <div className="stCourseStudyListInner">{list}</div>
                        </div>
                        <div className="stCourseStudyListFooter">
                            <ToggleSwitch label="autoplay" on={this.state.autoplay} onClick={(e) => {
                                this.setState((prev) => {
                                    return {autoplay: !prev.autoplay}
                                })
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}