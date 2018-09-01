import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ResetPassword from './components/ResetPassword'
import allYourBase from './components/allYourBase'
import ST404 from './components/ST404'
import Signup from './components/Signup'
import STAuthContainer from './components/STAuthContainer'
import _st from './_st'

window._st = _st

const mount = document.getElementById('stApp')

ReactDOM.render( 
    <BrowserRouter>
        <Switch>
            <Route exact path='/all-your-base-are-belong-to-us' component={allYourBase} />
            <Route path='/password/reset' component={ResetPassword} />
            <Route path='/signup' component={Signup} />
            <Route path='/notfound' component={ST404} />
            <Route component={STAuthContainer}>
                <Route path='/login' />
                <Route path='/' />
            </Route>
        </Switch>
    </BrowserRouter>,
mount )