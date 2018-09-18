import React from 'react'
import { DataState } from './StateContext'
import Playlist from '../Playlist'
import ST404 from '../ST404'
import {Switch,Route,Redirect} from 'react-router-dom'

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
                            <Playlist obj={activeObj} />
                        )
                    else
                        return (
                            <React.Fragment>
                                <Header />
                                <main id="stAppStage" className='row'>
                                    <div>{activeObj.type}</div>
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