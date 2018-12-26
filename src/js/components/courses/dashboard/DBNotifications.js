import React from 'react'

export default class DBNotifications extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            fetched : false,
            notifications : []
        }
    }

    componentDidMount() {
        if (!this.state.fetched) _st.http.get('/courses/notifications',(d) => {
            this.setState({
                fetched: true,
                notifications: d.data
            })
        })
    }

    render() {
        let {fetched, notifications} = this.state,
            notes = notifications.map((o) => JSON.stringify(o) )
        return (
            <div className="stDashboardNotifications">
                <div className="heading">Notifications</div>
                <div className="stNotificationsBody">
                    {!fetched ? null : 
                        (notifications.length === 0) ? 
                            <div className="noNotes">No notifications to display</div> : 
                            <div className="stNotes">{notes}</div>
                    }
                </div>
            </div>
        )
    }
}