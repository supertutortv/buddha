import React from 'react'
import FAIco from '../FAIco'
import VidPlayer from '../VidPlayer'
import ToggleSwitch from '../pieces/toggleSwitch'

export default class MyStudyList extends React.Component {
    constructor(props) {
        super(props)

        this.playlist = this.props.data

        this.state = {
            vindex : 0,
            video : this.playlist[0].vidid,
            autoplay: this.props.autoplay
        }

    }

    changeVid(i) {
        this.setState((state) => {return {vindex: (typeof i === 'undefined') ? state.vindex + 1 : i}})
    }

    render() {
        let { playlist } = this,
            { updateSettings } = this.props,
            list = []

        playlist.forEach((o,i) => {
            let clsHl = (this.state.vindex === i) ? ' highlight' : ''
            list.push(
                <div className={"stCourseStudyListItem"+clsHl} onClick={() => this.changeVid(i)}>
                    <img src={"https://i.vimeocdn.com/video/"+o.thumb+"_295x166.jpg?r=pad"} />
                    <div class="listItemTitle">{o.name}</div>
                </div>
            ) 
        })
        console.log(playlist)
        return null
        return (
            <div className="stCourseTop">
                <div className="stCourseIntro">
                    <VidPlayer autoplay={this.state.autoplay.msl} video={this.state.video} />
                </div>
                <div className="stCourseMSL">
                    <div className="stCourseMSLInner">
                        <div className="stCourseStudyListHeading">My Study List</div>
                        <div className="stCourseStudyList">
                            <div className="stCourseStudyListInner">{list}</div>
                        </div>
                        <div className="stCourseStudyListFooter">
                            <ToggleSwitch label="autoplay" on={this.state.autoplay.msl} onClick={(e) => {
                                this.setState((prev) => {
                                    let obj = Object.assign(prev.autoplay,{'msl':!prev.autoplay.msl})
                                    updateSettings('autoplay',obj)
                                    return obj
                                })
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}