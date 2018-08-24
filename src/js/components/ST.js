import React from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {Switch, Route, Link, Redirect} from 'react-router-dom'
import {GlobalState} from '../utilities/GlobalState'
import STRoute from './router/STRoute'
import Main from './main/Main'
import Login from './pages/Login'
import Signup from './pages/Signup'
import allYourBase from './pages/allYourBase'
import * as auth from '../functions/auth'


export default class ST extends React.Component {
    constructor(props) {
        super(props)
        const { defaultState } = this.props
        this.state = defaultState
        console.log(props)
    }

    verifySession(cb) {auth.verifySession.call(this,cb)}

    loading() {
        let stApp = document.getElementById('stApp')
        return this.state.loading ? stApp.classList.add('loading') : stApp.classList.remove('loading')
    }

    componentDidMount() {}

    render() {
        return (
            <GlobalState.Provider value={this}>
                <Switch>
                    <STRoute path='/login' component={Login} />
                    <STRoute path='/signup' component={Signup} />
                    <STRoute path='/all-your-base-are-belong-to-us' component={allYourBase} />
                    <STRoute path='/' component={Main} />
                </Switch>
            </GlobalState.Provider>
        )
    }
}