import React from 'react'
import { DataState } from './StateContext'
import { DBCourses, DBStats, DBActions } from './dashboard/components'
import Header from '../Header'

export default class Dashboard extends React.Component {
    constructor(props){
        super(props)

        this.state = {}

        this.cancellation = this.cancellation.bind(this)
    }

    componentDidMount() {
        _st.bodyClass = 'dashboard'
        _st.loading = false
    }

    cancellation(d) {
        let result = d.action == 'trial' ? window.confirm("This action will remove your trial status and charge your card on file, giving you full access to the course. Are you sure you wish to proceed?") : window.confirm("This action will completely cancel your subscription. You will lose access to your course or courses. Are you sure you wish to proceed?")

        if (result) _st.http.post('/signup/cancel',d,(resp) => console.log(resp))
    }

    render() {
        return(
            <DataState.Consumer>
                {(data) => {
                    return (
                        <React.Fragment>
                            <Header title="Dashboard" hist={this.props.history}/>
                            <main className="stDashboard stComponentFade">
                                <DBStats />
                                <DBCourses courses={data.courses} />
                                <DBActions cancellation={this.cancellation} d={data.user} />
                            </main>
                        </React.Fragment>
                    )
                }}
            </DataState.Consumer>
        )
    }
}