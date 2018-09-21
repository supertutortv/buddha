import React from 'react'
import { DataState } from './StateContext'
import Header from '../Header'
import Playlist from '../Playlist'
import STicon from '../STicon'
import ST404 from '../ST404'
import {Switch,Route,Redirect,Link} from 'react-router-dom'

const Course = ({location: loc, history: hist, match, setState}) => {
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
                        /* let sections = []
                        Object.keys(data.courses[params.courses].collections).forEach((val) => {
                            sections = <Link>{val.name}</Link>
                        }) */

                        return (
                            <React.Fragment>
                                <Header />
                                <main id="stAppStage" className='row'>
                                    <div className="stVectorGraphic">
                                        <STicon />
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