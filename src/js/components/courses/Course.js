import React from 'react'
import { withRouter } from 'react-router'
import { DataState } from './StateContext'
import Header from '../Header'
import Playlist from '../Playlist'
import VidPlayer from '../VidPlayer'
import FAIco from '../FAIco'
import STSectionBox from './STSectionBox'
import ST404 from '../ST404'

const Practice = ({hist,path,trialing,obj}) => {

    let t = []
    Object.keys(obj).forEach((b) => {
        let book = obj[b],
            tests = []

            Object.keys(book.tests).forEach((test) => {
                let tTest = book.tests[test],
                    unavail = Object.keys(tTest.collection).some((v) => tTest.collection[v].id === 0),
                    pPath = path+'/'+b+'/'+test

                if (!trialing && unavail)
                    tests.push(<div className="stPracticeTest inactive">{tTest.name}</div>)
                else
                    tests.push(<div className="stPracticeTest" onClick={(e) => hist.push(pPath)}>{tTest.name}</div>)
            })
        t.push(
            <section className="stPracticeBook">
                <div className="stPracticeBookName">{book.name}</div>
                <div className="stPracticeTests">{tests}</div>
            </section>
        )
    })
    return t
}

export default class Course extends React.Component {
    constructor(props) {
        super(props)

        this.params = this.props.match.params
        this.hist = this.props.history
        this.loc = this.props.location
        this.modalActive = this.props.modalActive

        this.icons = {
            english: 'comment-dots',
            math: 'calculator',
            reading: 'book',
            science: 'microscope',
            essay: 'edit'
        }
    }

    componentDidMount() {
        _st.bodyClass = 'main'
    }
    
    render() {
        return(
            <DataState.Consumer>
                {(data) => {
                    try {
                        var activeObj = Object.entries(this.props.match.params).reduce((obj,val) => {
                            if (typeof val[1] === 'undefined')
                                return obj
                            else
                                if ( !(val[1] in obj[val[0]]) ) throw true
                                return obj[val[0]][val[1]]
                        }, data)
    
                        if (activeObj.type === 'playlist')
                            return (
                                <Playlist loc={this.loc} hist={this.hist} match={this.match} obj={activeObj} />
                            )
                        else
                            var sections = [],
                                collections = data.courses[this.params.courses].collections
    
                            Object.keys(collections).forEach((val) => {
                                if (val === 'practice') return
                                sections.push(<STSectionBox hist={this.hist} path={this.loc.pathname+'/'+val} {...collections[val]} icon={this.icons[val]} />)
                            })
    
                            return (
                                <React.Fragment>
                                    <Header title={data.courses[this.params.courses].name} hist={this.hist} />
                                    <main className="stAppStage stComponentFade">
                                        <div className="stAppStageInner">
                                            <div className="stCourseTop">
                                                <div className="stCourseIntro">
                                                    <VidPlayer showTitle video={data.courses[this.params.courses].intro} />
                                                </div>
                                                <div className="stCourseActions">
                                                    <div className="stCourseSearch">
                                                        <div className="stCourseAction"><FAIco title="Search this course" icon="search"/><span className="stActionTxt">Search videos</span></div>
                                                    </div>
                                                    <div className="stCourseBarHeading">My Videos</div>
                                                    <div className="stCourseBar">
                                                        <div className="stCourseAction" onClick={() => this.modalActive(true)}><FAIco title="Downloads" icon="cloud-download-alt"/><span className="stActionTxt">Downloads</span></div>
                                                        <div className="stCourseAction"><FAIco title="Take a practice test" icon="file-alt"/><span className="stActionTxt">Practice Test</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="stSectionsSection">
                                                {sections}
                                            </div>
                                            <div className="stPracticeSection">
                                                <div className="boxHeader"></div>
                                                <div className="stPracticeSectionInner">
                                                    <div className="stPracticeTop">
                                                        <div className="boxIco"><FAIco title={collections.practice.name} icon="chart-line"/></div>
                                                        <div className="boxTitle">Practice</div>
                                                        <div className="stPracticeNote">{!data.user.trialing ? '(Note: some sections may not be available during the trial period.)' : ''}</div>
                                                    </div>
                                                    <div className="stPracticeBody">
                                                        <Practice hist={this.hist} path={this.loc.pathname+'/practice'} trialing={data.user.trialing} obj={collections.practice.collection} />
                                                    </div>
                                                </div>
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
}