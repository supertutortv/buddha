import React from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {Switch, Route, Link, Redirect} from 'react-router-dom'
import STRoute from './router/STRoute'
import Main from './main/Main'
import Login from './pages/Login'

import allYourBase from './pages/allYourBase'

export default class ST extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading : true,
            auth : null
        }
        this.loading()
    }

    verifySession() {
        fetch('https://api.supertutortv.com/v2/auth/verify', {
            method: 'POST',
            accept: 'application/vnd.sttv.app+json',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(d => {
            this.setState({
                auth : d.data,
                loading : false
            })
            this.loading()
        })
    }

    getData() {
        return true
    }

    loading() {
        let stApp = document.getElementById('stApp')
        return this.state.loading ? stApp.classList.add('loading') : stApp.classList.remove('loading')
    }

    componentDidMount() {
        this.verifySession()
    }

    render() {
        if (this.state.auth === null) return null
        return (
            <Switch>
                <STRoute path='/login' component={Login} auth={this.state.auth}/>
                <STRoute path='/signup' component={Login} auth={this.state.auth}/>
                <STRoute path='/all-your-base-are-belong-to-us' component={allYourBase} />
                <STRoute path='/' component={Main} auth={this.state.auth}/>
            </Switch>
        )
    }
}