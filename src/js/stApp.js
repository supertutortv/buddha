import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import allYourBase from './components/pages/allYourBase'
import Signup from './components/pages/Signup'
import STAuthContainer from './components/STAuthContainer'
import Main from './components/main/Main'
import Login from './components/pages/Login'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path='/all-your-base-are-belong-to-us' component={allYourBase} />
            <Route path='/signup' component={Signup} />
            <STAuthContainer>
                <Route path='/login' component={Login} />
                <Route path='/' component={Main} />
            </STAuthContainer>
        </Switch>
    </BrowserRouter>,
    document.getElementById('stApp')
)