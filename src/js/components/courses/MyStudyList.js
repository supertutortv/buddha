import React from 'react'
import FAIco from '../FAIco'
import VidPlayer from '../VidPlayer'
import ToggleSwitch from '../pieces/toggleSwitch'

export default class MyStudyList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            vindex : 0,
            video : this.props.data[0].vidid,
            autoplay: this.props.autoplay,
            updating: false
        }

        this.changeVid = this.changeVid.bind(this)
        this.removeVid = this.removeVid.bind(this)
        this.resetIndex = this.resetIndex.bind(this)
    }

    componentDidUpdate() {
        //console.log(this.state)
    }

    removeVid(test,e,i,o,cb) {
        this.props.removePL(test,o,i)
        typeof cb === 'function' && cb()
    }

    resetIndex() {
        this.setState({vindex: 0})
    }

    changeVid(i) {
        this.setState((state) => {return {vindex: (typeof i === 'undefined') ? (this.props.data.length-1 === state.vindex ? 0 : state.vindex + 1) : i}})
    }

    render() {
        console.log(this.state.vindex)
        let { data: playlist, updateSettings, test } = this.props,
            list = playlist.map((o,i) => {
                let clsHl = (this.state.vindex === i) ? 'highlight' : ''
                return (
                    <div id={"item"+i} className={["stCourseStudyListItem",clsHl].join(' ')} onClick={(e) => {
                        this.state.updating = true
                            if (e.target.classList.contains('listRemoveItem')) {
                                if (window.confirm('Are you sure you want to delete this video?')) {
                                    this.removeVid(test,e,i,o,() => i > playlist.length-1 ? this.resetIndex : null)
                                }
                            } else {
                                this.changeVid(i)
                            }
                        }
                        }>
                        <img src={"https://i.vimeocdn.com/video/"+o.thumb+"_295x166.jpg?r=pad"} />
                        <div className="listItemTitle">{o.name}</div>
                        <div className="listRemoveItem" onClick={(e) => {}}>x</div>
                    </div>
                )
            })
            console.log(playlist)
        return (
            <div className="stCourseTop">
                <div className="stCourseIntro">
                    <VidPlayer ind={(n) => this.setState({vindex: n})} autoplay={this.state.autoplay.msl} getNextVid={this.changeVid} video={playlist[this.state.vindex].vidid} />
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