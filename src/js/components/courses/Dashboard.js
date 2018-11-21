import React from 'react'
import { DataState } from './StateContext'
import { DBCourses, DBStats, DBActions } from './dashboard/components'
import Header from '../Header'

const Dashboard = ({history: hist}) => {
    _st.bodyClass = 'dashboard'
    return(
        <DataState.Consumer>
            {(data) => {
                return (
                    <React.Fragment>
                        <Header title="Dashboard" hist={hist}/>
                        <main className="stDashboard stComponentFade">
                            <DBStats />
                            <DBCourses courses={data.courses} />
                            <DBActions d={data.user} />
                        </main>
                    </React.Fragment>
                )
            }}
        </DataState.Consumer>
    )
}

export default Dashboard