import React from 'react'
import { withRouter } from 'react-router'
import { DataState } from './StateContext'
import Header from '../Header'
import Playlist from '../Playlist'
import FAIco from '../FAIco'
import STSectionBox from './STSectionBox'
import MyStudyList from './MyStudyList'
import ST404 from '../ST404'

function deleteUdata(dt,cb) {
    _st.http.del('/courses/data',dt,cb)
}

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

const Course = ({match, history: hist, location: loc, modalActive, setPlaylist, addHistory, refreshData, updateSettings}) => {
    const {params} = match
    const icons = {
        essay: 'scroll',
        english: 'comment-dots',
        math: 'calculator',
        reading: 'book',
        science: 'microscope',
        'writing-and-language': 'edit'
    }
    _st.bodyClass = 'main'

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
                    }, data),
                        test = data.courses[params.courses].test

                    if (activeObj.type === 'playlist')
                        return (
                            <Playlist addHistory={addHistory} deleteUdata={deleteUdata} playlist={data.courses[params.courses].playlist} watchHist={data.courses[params.courses].history} setPlaylist={setPlaylist} test={test} modalActive={modalActive} refDls={data.courses[params.courses].downloads} dls={data.courses[params.courses].collections[params.collections].downloads} loc={loc} hist={hist} match={match} obj={activeObj} />
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
                                <Header refreshData={refreshData} title={data.courses[params.courses].name} hist={hist} />
                                <main className="stAppStage stComponentFade">
                                    <div className="stAppStageInner">
                                        <MyStudyList updateSettings={updateSettings} autoplay={data.user.settings.autoplay} data={data.courses[params.courses].playlist} />
                                        <div className="stSectionsSection">
                                            {sections}
                                        </div>
                                        <div className="stPracticeSection">
                                            <div className="boxHeader"></div>
                                            <div className="stPracticeSectionInner">
                                                <div className="stPracticeTop">
                                                    <div>
                                                        <div className="boxIco"><FAIco title={collections.practice.name} icon="chart-line"/></div>
                                                        <div className="boxTitle">Practice Test Explanations</div>
                                                        <div className="stPracticeNote">{!data.user.trialing ? '(Note: some sections may not be available during the trial period.)' : ''}</div>
                                                    </div>
                                                    {/* <div><FAIco title="Take a practice test" icon="vial"/><span className="boxPracTest">Take a practice test</span></div> */}
                                                </div>
                                                <div className="stPracticeBody">
                                                    <Practice hist={hist} path={loc.pathname+'/practice'} trialing={data.user.trialing} obj={collections.practice.collection} />
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

export default Course