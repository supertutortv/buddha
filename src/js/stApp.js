import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import allYourBase from './components/allYourBase'
import Signup from './components/Signup'
import STSecured from './components/STSecured'
import _st from './_st'

window._st = _st

ReactDOM.render( 
    <BrowserRouter>
        <Switch>
            {_st.loading = true}
            <Route exact path='/all-your-base-are-belong-to-us' component={allYourBase} />
            <Route exact path='/signup' component={Signup} />
            <Route path='/' render={(p) => <STSecured {...p} />} />
        </Switch>
    </BrowserRouter>,
document.getElementById('stApp') )