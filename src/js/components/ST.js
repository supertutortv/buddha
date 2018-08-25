import React from 'react'
import {Switch} from 'react-router-dom'
import {GlobalState} from '../utilities/StateContext'
import STRoute from './router/STRoute'
import STAuthContainer from './main/STAuthContainer'
import Main from './main/Main'
import Login from './pages/Login'
import Signup from './pages/Signup'
import allYourBase from './pages/allYourBase'
import * as auth from '../functions/auth'


export default class ST extends React.Component {
    constructor(props) {
        super(props)
        const { defaultState, ...rest } = this.props
        this.state = defaultState
        this.atts = rest
    }

    verifySession(cb) {auth.verifySession.call(this,cb)}

    loading() {
        let stApp = document.getElementById('stApp')
        return this.state.loading ? stApp.classList.add('loading') : stApp.classList.remove('loading')
    }

    render() {
        return (
            <Switch>
                <STRoute path='/all-your-base-are-belong-to-us' component={allYourBase} />
                <STRoute path='/signup' component={Signup} />
                <GlobalState.Provider value={{state:this.state,atts:this.atts}}>
                    <STAuthContainer st={this}>
                        <STRoute path='/login' component={Login} />
                        <STRoute path='/' component={Main} />
                    </STAuthContainer>
                </GlobalState.Provider>
            </Switch>
        )
    }
}