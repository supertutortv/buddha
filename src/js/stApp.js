import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import allYourBase from './components/allYourBase'
import Signup from './components/Signup'
import STAuthContainer from './components/STAuthContainer'
import Main from './components/Main'
import Login from './components/Login'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            {console.log(this)}
            <Route path='/all-your-base-are-belong-to-us' component={allYourBase} />
            <Route path='/signup' component={Signup} />
            <Route component={STAuthContainer}>
                <Route path='/login' component={Login} />
                <Route path='/' component={Main} />
            </Route>
        </Switch>
    </BrowserRouter>,
    document.getElementById('stApp')
)