import React from 'react'
import { DataState } from './StateContext'
import { DBCourses, DBStats } from './dashboard/components'

const Dashboard = (props) => {
    return(
        <DataState.Consumer>
            {(data) => {
                return (
                    <React.Fragment>
                        <DBStats />
                        <DBCourses courses={data.courses} />
                    </React.Fragment>
                )
            }}
        </DataState.Consumer>
    )
}

export default Dashboard