import React from 'react'
import { DataState } from './StateContext'
import { DBCourses, DBStats, DBActions } from './dashboard/components'
import Header from '../Header'

export default class Dashboard extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        _st.bodyClass = 'dashboard'
        _st.loading = false
    }

    render() {
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
}

const Dashboard = ({history: hist}) => {
    _st.bodyClass = 'dashboard'
    
}

export default Dashboard