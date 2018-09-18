import React from 'react'
import { DataState } from './StateContext'
import { DBCourses, DBStats } from './dashboard/components'
import Header from '../Header'

const Dashboard = (props) => {
    return(
        <DataState.Consumer>
            {(data) => {
                return (
                    <React.Fragment>
                        <Header />
                        <DBStats />
                        <DBCourses courses={data.courses} />
                    </React.Fragment>
                )
            }}
        </DataState.Consumer>
    )
}

export default Dashboard