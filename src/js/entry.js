import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import ST from './components/ST'
import allYourBase from './components/allYourBase'

ReactDOM.render(
    <BrowserRouter>
        <Route path='/all-your-base-are-belong-to-us' component={allYourBase} />
        <Route path='/' component={ST} />
    </BrowserRouter>,
    document.getElementById("stApp")
)