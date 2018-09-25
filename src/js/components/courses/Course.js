import React from 'react'
import {Switch,Route,Redirect,Link} from 'react-router-dom'
import { DataState } from './StateContext'
import Header from '../Header'
import Playlist from '../Playlist'
import STSectionBox from './STSectionBox'
import ST404 from '../ST404'

const CourseNav = () =>
    <ul>
        <li><a href="http://support.supertutortv.com" target="blank"><i className="brainy-question-mark"></i></a></li>
        <li><a href="#" onClick={(e) => {
            e.preventDefault()
            return (
                <Redirect push to="/dashboard" />
            )
        }} ><i className="brainy-pupil"></i></a></li>
    </ul>

const Course = ({location: loc, history: hist, match, setState}) => {
    _st.bodyClass = 'main'
    const { params } = match
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
                            sections.push(<STSectionBox hist={hist} path={loc.pathname+'/'+val} {...collections[val]} icon="owl" />)
                        })

                        return (
                            <React.Fragment>
                                <Header courseNav={CourseNav} />
                                <main id="stAppStage" className='row'>
                                    <div className="stSectionsSection">
                                        {sections}
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