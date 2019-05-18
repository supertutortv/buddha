import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import allYourBase from './components/allYourBase'
import Gateway from './components/Gateway'
import STTV from './_st'

console.log(process.env.APP_MODE)

window._st = STTV

ReactDOM.render( 
    <BrowserRouter>
        <Switch>
            <Route exact path='/all-your-base-are-belong-to-us' component={allYourBase} />
            <Route exact path={[
                '/password/reset/:key?',
                '/signup/:plan?',
                '/login'
            ]} component={Gateway} />
            <Route path='/' render={(p) => <Gateway {...p} />} />
        </Switch>
    </BrowserRouter>,
document.querySelector('st-app') )