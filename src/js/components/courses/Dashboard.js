import React from 'react'
import { DataState } from './StateContext'
import { AuthContext } from '../../context'
import { DBCourses, DBNotifications, DBActions } from './dashboard/components'
import Header from '../Header'
import Onboarding from '../onboarding/Onboarding'
import TextureImg from '../onboarding/texture'

export default class Dashboard extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            error: {},
            coupons: null,
            hasCourses: true,
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

    cancellation(e,d) {
        e.stopPropagation()
        let result = d.action == 'trial' ? window.confirm("This action will remove your trial status and charge your card on file, giving you full access to the course. Are you sure you wish to proceed?") : window.confirm("This action will completely cancel your subscription. You will lose access to your course. Are you sure you wish to proceed?")

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

    triggerPurchase() {
        this.setState({
            hasCourses: false
        })
        return null
    }

    render() {
        let {notifications,hasCourses} = this.state
        if (notifications.active) console.log(notifications.active)
        return(
            <AuthContext.Consumer>
                {auth => {
                    return (
                        <DataState.Consumer>
                            {data => {
                                console.log(data)
                                return (<React.Fragment>
                                    <Header title="Home" refreshData={this.props.refreshData} hist={this.props.history}/>
                                    {!hasCourses ? <Onboarding refreshData={this.props.refreshData} /> : 
                                        <React.Fragment>
                                            {data.courses.length === 0 ? this.triggerPurchase() : 
                                                <main className="stDashboard stComponentFade">
                                                    <div className="stHomeBanner">
                                                        <TextureImg/>
                                                    </div>
                                                    <DBCourses user={data.user} courses={data.courses} />
                                                    <div className="stNotesActions">
                                                        <DBNotifications openNote={this.openNote} dismissNote={this.dismissNote} {...notifications} />
                                                        {/* <DBActions cancellation={this.cancellation} d={data.user} /> */}
                                                    </div>
                                                    <div><button onClick={(e) => {
                                                        e.preventDefault()
                                                        fetch('https://us-central1-supertutortv-1deda.cloudfunctions.net/getCoupon',{
                                                            method: 'POST',
                                                            headers: {
                                                                'Content-Type': 'application/json'
                                                            },
                                                            body: JSON.stringify({coupon:'helloworld'})
                                                        })
                                                        .then((res) => console.log(res))
                                                    }}>Get Coupons</button></div>
                                                    <div>{this.state.coupons}</div>
                                                </main>
                                            }
                                        </React.Fragment>
                                    }
                                </React.Fragment>)
                                }
                            }
                        </DataState.Consumer>
                    )
                }}
            </AuthContext.Consumer>
        )
    }
}