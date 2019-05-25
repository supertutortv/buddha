import React from 'react'
import { DataState } from './StateContext'
import { AuthContext } from '../../context'
import { DBCourses, DBNotifications, DBActions } from './dashboard/components'
import Header from '../Header'
import Checkout from '../Checkout'

export default class Dashboard extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            error: {},
            checkout: false,
            notifications: {
                active: false,
                fetched: true,
                notes: []
            }
        }

        this.cancellation = this.cancellation.bind(this)
        this.openNote = this.openNote.bind(this)
        this.dismissNote = this.dismissNote.bind(this)
        this.triggerPurchase = this.triggerPurchase.bind(this)
    }

    componentDidMount() {
        _st.bodyClass = 'dashboard'
        _st.loading = false
        /* if (!this.state.notifications.fetched) _st.http.get('/courses/notifications',(d) => {
            this.setState({
                notifications: {
                    active: false,
                    fetched: true,
                    notes: d.data
                }
            })
        }) */
    }

    cancellation(d) {
        let result = d.action == 'trial' ? window.confirm("This action will remove your trial status and charge your card on file, giving you full access to the course. Are you sure you wish to proceed?") : window.confirm("This action will completely cancel your subscription. You will lose access to your course or courses. Are you sure you wish to proceed?")

        if (result) _st.http.post('/signup/cancel',d,(resp) => {
            if (resp.code === 'signupError')
                return this.setState({error: {...resp}}, () => console.log(this.state.error))
            else {
                alert(resp.message)
                _st.http.post('/auth/logout',{},() => this.props.refreshData())
            }
        })
    }

    openNote(id) {
        _st.http.post('/courses/notification',{id: id},(d) => {
            this.setState(
                prev => Object.assign(prev.notifications,{active: d.data})
            )
        })
    }

    dismissNote(id) {
        this.setState(
            prev => Object.assign(prev.notifications,{notes: prev.notifications.notes.filter(note => note.id !== id)}),
            () => _st.http.put('/courses/notifications',{id: id})
        )
    }

    triggerPurchase(plan=null) {
        this.setState({
            checkout: true
        },() => this.props.modalActive({
            open: true,
            action: null,
            mData: <Checkout plan={plan} />,
            xtraClass: 'checkout'
        }))
        return null
    }

    render() {
        if (this.state.notifications.active) console.log(this.state.notifications.active)
        return(
            <AuthContext.Consumer>
                {auth => {
                    console.log(auth)
                    return (
                        <DataState.Consumer>
                            {data =>
                                <React.Fragment>
                                    <Header refreshData={this.props.refreshData} title="Dashboard" hist={this.props.history}/>
                                    <main className="stDashboard stComponentFade">
                                        <DBCourses courses={data.courses} />
                                        <div className="stNotesActions">
                                            <DBNotifications openNote={this.openNote} dismissNote={this.dismissNote} {...this.state.notifications} />
                                            <DBActions cancellation={this.cancellation} d={data.user} />
                                        </div>
                                    </main>
                                    {data.courses.length === 0 && this.state.checkout === false ? this.triggerPurchase(auth.plan) : null}
                                </React.Fragment>
                            }
                        </DataState.Consumer>
                    )
                }}
            </AuthContext.Consumer>
        )
    }
}