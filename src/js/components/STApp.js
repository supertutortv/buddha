import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import allYourBase from './allYourBase'
import Gateway from './Gateway'
import Signup from './Signup'
import ResetPassword from './ResetPassword'

export default class STApp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedIn: null
        }

        this.logThatFuckerIn = this.logThatFuckerIn.bind(this)
        this.authCheck = this.authCheck.bind(this)
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

    logThatFuckerIn() {
        this.setState({
            loggedIn: true
        })
    }

    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/all-your-base-are-belong-to-us' component={allYourBase} />
                    {/* <Route exact path='/signup/:plan?' component={Signup} /> */}
                    <Route exact path={['/auth','/login','/password/reset/:key?']} render={(p) => {
                        <Route exact path='/signup/:plan?' component={Signup}/>
                        if (this.state.loggedIn === null) return this.authCheck()
                        return (
                            <div>Hello world</div>
                        )
                    }} />
                    <Route path='/' render={(p) => <Gateway {...p} />} />
                </Switch>
            </BrowserRouter>
        )
    }
}