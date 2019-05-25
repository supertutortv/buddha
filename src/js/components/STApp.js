import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context'
import allYourBase from './allYourBase'
import Gateway from './Gateway'
import Signup from './Signup'
import ResetPassword from './ResetPassword'
import Login from './Login'
import Main from './Main'

export default class STApp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedIn: null,
            plan: null
        }

        this.vers = JSON.parse(localStorage.getItem('stVersionHashes') || '[]')

        this.logThatFuckerIn = this.logThatFuckerIn.bind(this)
        this.hashSaveLocal = this.hashSaveLocal.bind(this)
        this.authCheck = this.authCheck.bind(this)
        this.setPlan = this.setPlan.bind(this)
        this.refresh = this.refresh.bind(this)
    }

    componentDidMount() {
        this.hashSaveLocal(this.vers).authCheck()
    }

    authCheck() {
        if (this.state.loggedIn === null) {
            _st.http.post('/auth/verify',{},(d) => {
                this.setState({
                    loggedIn: d.data
                })
            })
        }
        return null
    }

    hashSaveLocal(hashes) {
        if (hashes.indexOf(stVersionHash) < 0) {
            hashes.push(stVersionHash)
            localStorage.setItem('stVersionHashes',JSON.stringify(hashes))
            this.refresh(true)
        }
        return this
    }

    setPlan(plan=null) {
        this.setState({
            plan: plan
        })
    }

    logThatFuckerIn() {
        this.setState({
            loggedIn: true
        })
        return true
    }

    refresh(hard=false) {
        localStorage.removeItem('stCourseData')
        if (hard) window.location.reload(true)
        return null
    }

    render () {
        let { loggedIn } = this.state
        return (
            <AuthContext.Provider value={this.state}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/all-your-base-are-belong-to-us' component={allYourBase} />
                        <Route exact path={['/signup/:plan?','/password/reset/:key?','/login']} render={(p) => {
                            return (
                                <Switch>
                                    <Gateway className={'st-'+(p.location.key || 'el6s42m')}>
                                        <Route exact path='/signup/:plan?' render={() => <Signup logIn={this.logThatFuckerIn} setPlan={this.setPlan} {...p}/>}/>
                                        <Route render={() =>
                                            loggedIn === null ? this.refresh() :
                                            <Switch>
                                                <Route exact path='/password/reset/:key?' component={ResetPassword}/>
                                                <Route exact path='/login' render={() => 
                                                    loggedIn ? <Redirect to='/dashboard'/> : <Login logIn={this.logThatFuckerIn} {...p}/>}/>
                                            </Switch>
                                        } />
                                    </Gateway>
                                </Switch>
                            )
                        }} />
                        <Route path='/' render={(p) => 
                            loggedIn === null ? null :
                            loggedIn ? <Main refresh={this.refresh} {...p}/> : <Redirect to='/login'/>
                        }/>
                    </Switch>
                </BrowserRouter>
            </AuthContext.Provider>
        )
    }
}