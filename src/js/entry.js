import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ST from './components/ST'
import allYourBase from './components/allYourBase'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path='/all-your-base-are-belong-to-us' component={allYourBase} />
            <Route path='/' component={ST} />
        </Switch>
    </BrowserRouter>,
    document.getElementById("stApp")
)