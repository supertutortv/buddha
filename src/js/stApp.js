import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import allYourBase from './components/allYourBase'
import Gateway from './components/Gateway'
import Signup from './components/Signup'
import ResetPassword from './components/ResetPassword'
import STTV from './_st'

console.log(process.env.APP_MODE)

window._st = STTV

ReactDOM.render( 
    <BrowserRouter>
        <Switch>
            <Route exact path='/all-your-base-are-belong-to-us' component={allYourBase} />
            <Route exact path='/signup/:plan?' component={Signup} />
            <Route exact path='/password/reset/:key?' component={ResetPassword} />
            <Route exact path='/login' component={Gateway} />
            <Route path='/' render={(p) => <Gateway {...p} />} />
        </Switch>
    </BrowserRouter>,
document.querySelector('st-app') )