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
            activating: false,
            activation: {
                active: false,
                inner: null
            },
            card: null
        }

        this.closeOverlay = this.closeOverlay.bind(this)
        this.cancellActivate = this.cancellActivate.bind(this)
        this.openNote = this.openNote.bind(this)
        this.dismissNote = this.dismissNote.bind(this)
        this.triggerPurchase = this.triggerPurchase.bind(this)
        this.failFlag = this.failFlag.bind(this)
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
                    <span className="cancellationMessage">To cancel your trial and not be charged, please send an email to support@supertutortv.com from the email associated with this account (<strong>{d.data.email}</strong>). If your request is within 48 hours of the end of your trial period you may still possibly be charged, but we will refund you when your request is processed.</span>
                    <div className="buttonContainer">
                        <button className="btn" onClick={this.closeOverlay}>Close</button>
                    </div>
                </>
                break
                case 'initiate':
                    obj.inner = <>
                        <span className="cancellationMessage">Please send an email to support@supertutortv.com from the email associated with this account (<strong>{d.data.email}</strong>) to process your payment and activate your full course access.</span>
                        <div className="buttonContainer">
                            <button className="btn" onClick={this.closeOverlay}>Close</button>
                        </div>
                    </>
                    /* await _st.http.get('/signup/getcard',(ddd) => {
                        obj.inner = <>
                            <span className="cancellationMessage">Doing this will remove your trial status and charge the below card on file, giving you full access to this course. Are you sure you wish to proceed?</span>
                            <StCCContainer card={ddd.card}/>
                            <div className="buttonContainer">
                                <button className="btn" onClick={(e) => this.cancellActivate(e,{
                                    action: 'activate',
                                    subId: d.sub
                                })}>Confirm</button>
                            </div>
                            {this.state.error.msg ? <span>{this.state.error.msg}</span> : null}
                        </>
                    }) */
                    break
                case 'activate':
                    this.setState({activating: true})
                    await _st.http.post('/signup/activate',{
                        subId: d.subId
                    },(ddd) => {
                        if (ddd.code === 'signupError') this.setState({
                            error: {
                                code: ddd.code,
                                msg: ddd.data.message
                            }
                        })
                    })
                break
        }

        setTimeout(() => {
            this.setState({activating: false})
        },10000)

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

    failFlag(e) {
        e.preventDefault()
        this.setState((state) => {
            return {
                activation: {
                    active: true,
                    inner: <>
                        <span className="cancellationMessage">Your trial period has expired, but there was a problem with your payment. Please click "Activate full course" to continue.</span>
                        <div className="buttonContainer">
                            <button className="btn" onClick={this.closeOverlay}>Close</button>
                        </div>
                    </>
                }
            }
        })
    }

    render() {
        let {notifications,hasCourses,activation,error} = this.state
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
                                                    <DBCourses cancellation={this.cancellActivate} user={data.user} courses={data.courses} failFlag={this.failFlag}/>
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