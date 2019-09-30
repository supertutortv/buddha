import React from 'react'
import { DataState } from './StateContext'
import { AuthContext } from '../../context'
import { DBCourses, DBNotifications, DBActions } from './dashboard/components'
import Header from '../Header'
import Onboarding from '../onboarding/Onboarding'
import TextureImg from '../onboarding/texture'
import STOverlay from '../modal/STOverlay'
import StCCContainer from '../checkout/StCCContainer'

export default class Dashboard extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            loading: false,
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
            },
            activating: false,
            card: null
        }

        this.closeOverlay = this.closeOverlay.bind(this)
        this.cancellActivate = this.cancellActivate.bind(this)
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

    async cancellActivate(e,d) {
        e.preventDefault()

        if (this.state.loading || this.state.activating) return

        this.setState((state) => {
            return {
                loading: true,
                activation: {
                    ...state.activation,
                    active: true
                }
            }
        })

        let obj = {inner: this.state.activation.inner}

        switch (d.action) {
            case 'cancel':
                obj.inner = <>
                    <span className="cancellationMessage">To cancel your trial and not be charged the full amount, please send an email to support@supertutortv.com from the email associated with this account (<strong>{d.data.email}</strong>). If your request is within 48 hours of the end of your trial period you may still possibly be charged the full amount, but we will refund it to you when your request is processed.</span>
                    <div className="buttonContainer">
                        <button className="btn" onClick={this.closeOverlay}>Close</button>
                    </div>
                </>
                break
            case 'initiate':
                obj.inner = <>
                    <span className="cancellationMessage">Doing this will remove your trial status and charge the full price, giving you full access to this course. Are you sure you wish to proceed?</span>
                    <div className="buttonContainer">
                        <button className="btn" onClick={(e) => this.cancellActivate(e,{
                            action: 'activate',
                            subId: d.sub
                        })}>Confirm</button>
                    </div>
                </>
                break
            case 'activate':
                this.setState({activating: true})
                await _st.http.post('/signup/activate',{subId: d.subId},(d) => {
                    console.log(d)
                })
                break
        }

        setTimeout(() => {
            this.setState({activating: false})
        },5000)

        this.setState((state) => {
            return {
                loading: false,
                activation: {
                    ...state.activation,
                    inner: obj.inner
                }
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
                                                    <DBCourses cancellation={this.cancellActivate} user={data.user} courses={data.courses} />
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