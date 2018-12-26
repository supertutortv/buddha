import React from 'react'
import { DataState } from './StateContext'
import { DBCourses, DBStats, DBActions } from './dashboard/components'
import DBNotifications from './dashboard/DBNotifications'
import Header from '../Header'

export default class Dashboard extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            error: {}
        }

        this.cancellation = this.cancellation.bind(this)
    }

    componentDidMount() {
        _st.bodyClass = 'dashboard'
        _st.loading = false
    }

    cancellation(d) {
        let result = d.action == 'trial' ? window.confirm("This action will remove your trial status and charge your card on file, giving you full access to the course. Are you sure you wish to proceed?") : window.confirm("This action will completely cancel your subscription. You will lose access to your course or courses. Are you sure you wish to proceed?")

        if (result) _st.http.post('/signup/cancel',d,(resp) => {
            if (resp.code === 'signupError')
                return this.setState({error: {...resp}}, () => console.log(this.state.error))
            else {
                alert(resp.message)
                _st.auth.logout(() => this.props.refreshData())
            }
        })
    }

    render() {
        return(
            <DataState.Consumer>
                {(data) => {
                    return (
                        <React.Fragment>
                            <Header refreshData={this.props.refreshData} title="Dashboard" hist={this.props.history}/>
                            <main className="stDashboard stComponentFade">
                                <DBCourses courses={data.courses} />
                                <DBNotifications />
                                <DBActions cancellation={this.cancellation} d={data.user} />
                            </main>
                        </React.Fragment>
                    )
                }}
            </DataState.Consumer>
        )
    }
}