import React from 'react'
import { withRouter } from 'react-router'
import { DataState } from './StateContext'
import Header from '../Header'
import Playlist from '../Playlist'
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
                                <Header hist={hist} />
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