import React from 'react'

export default class DBNotifications extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            fetched : false,
            notifications : []
        }

        this.openNote = this.openNote.bind(this)
        this.dismissNote = this.dismissNote.bind(this)
    }

    componentDidMount() {
        if (!this.state.fetched) _st.http.get('/courses/notifications',(d) => {
            this.setState({
                fetched: true,
                notifications: d.data
            })
        })
    }

    openNote(id) {
        console.log(id)
    }

    dismissNote(id) {
        this.setState(prev => {
            console.log(prev)
            return false
        })
    }

    render() {
        let {fetched, notifications} = this.state
        return (
            <div className="stDashboardNotifications">
                <div className="heading">Notifications</div>
                <div className={["stNotificationsBody",fetched ? 'visible' : 'hidden'].join(' ')}>
                    {!fetched ? null : 
                        (notifications.length === 0) ? 
                            <div className="noNotes">No notifications to display</div> : 
                            <div className="stNotes">{
                                notifications.map((o) => 
                                    <div className="stNotification">
                                        <div className="stNoteDate">{o.date}</div>
                                        <div className="stNoteTitle"><span onClick={() => this.openNote(o.id)}>{o.title}</span></div>
                                        <div className="stNoteDismiss"><span onClick={() => this.dismissNote(o.id)}>x</span></div>
                                    </div>
                            )}</div>
                    }
                </div>
            </div>
        )
    }
}