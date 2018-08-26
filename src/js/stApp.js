import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import allYourBase from './components/allYourBase'
import Signup from './components/Signup'
import STAuthContainer from './components/STAuthContainer'
import Main from './components/Main'
import Login from './components/Login'

class STError extends React.Component {
    render() {
        return (<div>Error</div>)
    }
}

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/all-your-base-are-belong-to-us' component={allYourBase} />
            <Route path='/signup' component={Signup} />
            <Route path='/error' component={STError} />
            <Route component={STAuthContainer}>
                <Route path='/login' component={Login} />
                <Route path='/' component={Main} />
            </Route>
        </Switch>
    </BrowserRouter>,
    document.getElementById('stApp')
)