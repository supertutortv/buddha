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
    }

    removeVid(test,e,i,o) {
        
        window.setTimeout(() => {
            this.state.updating = true
            this.props.removePL(test,o,i)
        },100)
    }

    changeVid(i) {
        this.setState((state) => {return {vindex: (typeof i === 'undefined') ? (this.props.data.length-1 === state.vindex ? 0 : state.vindex + 1) : i}})
    }

    render() {
        let { data: playlist, updateSettings, test } = this.props,
            list = playlist.map((o,i) => {
                let clsHl = (this.state.vindex === i) ? 'highlight' : '',
                    rmv = (this.state.remove === i) ? 'remove' : ''
                return (
                    <div id={"item"+i} className={["stCourseStudyListItem",clsHl,rmv].join(' ')} onClick={(e) => {
                        this.state.updating = true
                            if (e.target.classList.contains('listRemoveItem')) {
                                if (window.confirm('Are you sure you want to delete this video?')) {
                                    this.setState({updating: false},() => window.setTimeout(() => this.removeVid(test,e,i,o),100))
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