import React from 'react'
import { DataState } from './StateContext'
import { DBCourses, DBStats } from './dashboard/components'
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
                        </main>
                    </React.Fragment>
                )
            }}
        </DataState.Consumer>
    )
}

export default Dashboard