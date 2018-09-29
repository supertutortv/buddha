import React from 'react'
import { withRouter } from 'react-router'
import { DataState } from './StateContext'
import Header from '../Header'
import Playlist from '../Playlist'
import VidPlayer from '../VidPlayer'
import FAIco from '../FAIco'
import STSectionBox from './STSectionBox'
import ST404 from '../ST404'

const Course = ({location: loc, history: hist, match, setState}) => {
    _st.bodyClass = 'main'
    const { params } = match,
        icons = {
            english: 'comment-dots',
            math: 'calculator',
            reading: 'book',
            science: 'microscope',
            essay: 'edit'
        }
    return(
        <DataState.Consumer>
            {(data) => {
                try {
                    var activeObj = Object.entries(params).reduce((obj,val) => {
                        if (typeof val[1] === 'undefined')
                            return obj
                        else
                            if ( !(val[1] in obj[val[0]]) ) throw true
                            return obj[val[0]][val[1]]
                    }, data)

                    if (activeObj.type === 'playlist')
                        return (
                            <Playlist loc={loc} hist={hist} match={match} obj={activeObj} />
                        )
                    else
                        var sections = [],
                            collections = data.courses[params.courses].collections
                        Object.keys(collections).forEach((val) => {
                            if (val === 'practice') return
                            sections.push(<STSectionBox hist={hist} path={loc.pathname+'/'+val} {...collections[val]} icon={icons[val]} />)
                        })

                        return (
                            <React.Fragment>
                                <Header title={data.courses[params.courses].name} hist={hist} />
                                <main className='stAppStage'>
                                    <div className="stAppStageInner">
                                        <div className="stCourseTop">
                                            <div className="stCourseIntro">
                                                <VidPlayer video={data.courses[params.courses].intro} />
                                            </div>
                                            <div className="stCourseActions">
                                                <div className="stCourseSearch">
                                                    <div className="stCourseAction"><FAIco title="Search this course" icon="search"/><span className="stActionTxt">Search videos</span></div>
                                                </div>
                                                <div className="stCourseBar">
                                                    <div className="stCourseAction"><FAIco title="Downloads" icon="cloud-download-alt"/><span className="stActionTxt">Downloads</span></div>
                                                    <div className="stCourseAction"><FAIco title="Rate/Review" icon="star"/><span className="stActionTxt">Rate This Course</span></div>
                                                    <div className="stCourseAction"><FAIco title="Leave Feedback" icon="comment-alt"/><span className="stActionTxt">Leave Feedback</span></div>
                                                    <div className="stCourseAction"><FAIco title="Take a practice test" icon="file-alt"/><span className="stActionTxt">Practice Test</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stSectionsSection">
                                            {sections}
                                        </div>
                                        <img src="https://learn.mangolanguages.com/img/layout/eeab0bf6ba36be53e4b4fb450c303305.png"/>
                                    </div>
                                </main>
                            </React.Fragment>
                        )
                } catch (e) {
                    console.log(e)
                    return (
                        <ST404 />
                    )
                }
            }}
        </DataState.Consumer>
    )
}

export default Course