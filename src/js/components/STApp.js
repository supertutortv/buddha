import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
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
        return true
    }

    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/all-your-base-are-belong-to-us' component={allYourBase} />
                    <Route exact path={['/signup/:plan?','/password/reset/:key?','/login']} render={(p) => {
                        if (this.state.loggedIn === null) return this.authCheck()
                        return (
                            <Switch>
                                <Gateway className={'st'+p.location.key}>
                                    <Route exact path='/signup/:plan?' render={() => <Signup logIn={this.logThatFuckerIn} {...p}/>}/>
                                    <Route exact path='/password/reset/:key?' component={ResetPassword}/>
                                    <Route exact path='/login' render={() => <Login logIn={this.logThatFuckerIn} {...p}/>}/>
                                </Gateway>
                            </Switch>
                        )
                    }} />
                    <Route path='/' render={(p) => 
                        this.state.loggedIn ? <Main {...p}/> : <Redirect to='/login'/>
                    }/>
                </Switch>
            </BrowserRouter>
        )
    }
}