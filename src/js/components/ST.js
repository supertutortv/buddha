import React from 'react'
import {Switch,Route} from 'react-router-dom'
import {GlobalState} from '../utilities/StateContext'
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
                <Route path='/all-your-base-are-belong-to-us' component={allYourBase} />
                <GlobalState.Provider value={{state:this.state,atts:this.atts}}>
                    <Route path='/signup' component={Signup} />
                    <STAuthContainer st={this}>
                        <Route path='/login' component={Login} />
                        <Route path='/' component={Main} />
                    </STAuthContainer>
                </GlobalState.Provider>
            </Switch>
        )
    }
}