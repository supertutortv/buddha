import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Header from './components/Header'
import allYourBase from './components/allYourBase'
import Signup from './components/Signup'
import MU from './components/MU'
import STSecured from './components/STSecured'
import STTV from './_st'

import '../sass/stApp.sass'

window._st = STTV

ReactDOM.render( 
    <BrowserRouter>
        <Switch>
            {<Header />}
            <Route exact path='/all-your-base-are-belong-to-us' component={allYourBase} />
            <Route exact path='/signup/:step?' component={Signup} />
            <Route exact path='/mu/:teacher' component={MU} />
            <Route exact path='/login' render={() => <Redirect to='/auth/token' />} />
            <Route path='/' render={(p) => <STSecured {...p} />} />
        </Switch>
    </BrowserRouter>,
document.querySelector('st-app') )