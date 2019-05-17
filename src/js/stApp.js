import React, { lazy } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import allYourBase from './components/allYourBase'
import Signup from './components/Signup'
import Gateway from './components/Gateway'
import ResetPassword from './components/ResetPassword'
import STSecured from './components/STSecured'
import STTV from './_st'

console.log(process.env.APP_MODE)

window._st = STTV

ReactDOM.render( 
    <BrowserRouter>
        <Switch>
            <Route exact path='/all-your-base-are-belong-to-us' component={allYourBase} />
            {/* <Route exact path='/mu/:teacher' component={MU} />
            <Route exact path='/password/reset/:key?' component={ResetPassword} /> */}
            <Route exact path={['/login','/signup/:plan?','/password/reset/:key?']} component={Gateway} />
            <Route path='/' render={(p) => <Gateway {...p} />} />
        </Switch>
    </BrowserRouter>,
document.querySelector('st-app') )