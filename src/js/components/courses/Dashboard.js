import React from 'react'
import { DataState } from './StateContext'
import { AuthContext } from '../../context'
import { DBCourses, DBNotifications, DBActions } from './dashboard/components'
import Header from '../Header'
import Onboarding from '../onboarding/Onboarding'
import TextureImg from '../onboarding/texture'
import STOverlay from '../modal/STOverlay'

export default class Dashboard extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            error: {},
            hasCourses: true,
            notifications: {
                active: false,
                fetched: true,
                notes: []
            },
            activation: {
                active: false,
                inner: null
            }
        }

        this.closeOverlay = this.closeOverlay.bind(this)
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

    closeOverlay(e) {
        e.preventDefault()
        this.setState({activation: {
            active: false,
            inner: null
        }})
    }

    async cancellation(e,d) {
        e.preventDefault()

        this.setState((state) => {
            return Object.assign(state.activation,{active: true})
        })

        let obj = {inner: this.state.activation.inner}

        if (d.action === 'cancel') {
            obj.inner = <>
                <span className="cancellationMessage">To cancel your trial and not be charged the full amount, please send an email to support@supertutortv.com from the email associated with this account (<strong>{d.data.email}</strong>). If your request is within 48 hours of the end of your trial period you may still possibly be charged the full amount, but we will refund it to you when your request is processed.</span>
                <div className="buttonContainer">
                    <button className="btn" onClick={this.closeOverlay}>Close</button>
                </div>
            </>
        } else {
            await _st.http.post('/signup/activate',{uuid: d.data.uuid},(ddd) => {
                obj.inner = <span>{JSON.stringify(ddd)}</span>
            })
            
        }

        this.setState((state) => {
            return Object.assign(state.activation,obj)
        })
        
        /* let result = d.action == 'trial' ? window.confirm("This action will remove your trial status and charge your card on file, giving you full access to the course. Are you sure you wish to proceed?") : window.confirm("This action will completely cancel your subscription. You will lose access to your course. Are you sure you wish to proceed?")

        if (result) _st.http.post('/signup/cancel',d,(resp) => {
            if (resp.code === 'signupError')
                return this.setState({error: {...resp}}, () => console.log(this.state.error))
            else {
                alert(resp.message)
                _st.http.post('/auth/logout',{},() => this.props.refreshData())
            }
        }) */
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
        let {notifications,hasCourses,activation} = this.state
        if (notifications.active) console.log(notifications.active)
        return(
            <AuthContext.Consumer>
                {auth => {
                    return (
                        <DataState.Consumer>
                            {data => (
                                <>
                                    <Header title="Home" refreshData={this.props.refreshData} hist={this.props.history}/>
                                    {!hasCourses ? <Onboarding refreshData={this.props.refreshData} /> : 
                                        <>
                                            {data.courses.length === 0 ? this.triggerPurchase() : 
                                                <main className="stDashboard stComponentFade">
                                                    <div className="stHomeBanner">
                                                        <TextureImg/>
                                                    </div>
                                                    <DBCourses cancellation={this.cancellation} user={data.user} courses={data.courses} />
                                                    <div className="stNotesActions">
                                                        <DBNotifications openNote={this.openNote} dismissNote={this.dismissNote} {...notifications} />
                                                    </div>
                                                </main>
                                            }
                                            {!activation.active ? null : 
                                            <STOverlay close={this.closeOverlay} className="activation">
                                                {activation.inner}
                                            </STOverlay>}
                                        </>
                                    }
                                </>
                            )}
                        </DataState.Consumer>
                    )
                }}
            </AuthContext.Consumer>
        )
    }
}