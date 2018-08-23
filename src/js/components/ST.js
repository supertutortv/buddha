import React from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {Switch, Route, Link, Redirect} from 'react-router-dom'
import STRoute from './router/STRoute'
import Main from './main/Main'
import Login from './pages/Login'
import Signup from './pages/Signup'
import allYourBase from './pages/allYourBase'
import * as auth from '../functions/auth'

export default class ST extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading : true,
            auth : null
        }

        this.verifySession = auth.verifySession.bind(this)
        this.loading = this.loading.bind(this)
        this.loading()
        console.log(_st.hello)
    }

    loading() {
        let stApp = document.getElementById('stApp')
        return this.state.loading ? stApp.classList.add('loading') : stApp.classList.remove('loading')
    }

    componentDidMount() {}

    render() {
        return (
            <Switch>
                <STRoute path='/login' component={Login} st={this}/>
                <STRoute path='/signup' component={Signup} st={this}/>
                <STRoute path='/all-your-base-are-belong-to-us' component={allYourBase} />
                <STRoute path='/' component={Main} st={this}/>
            </Switch>
        )
    }
}