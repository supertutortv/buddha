import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { GlobalState } from './utilities/StateContext'
import allYourBase from './components/allYourBase'
import Signup from './components/Signup'
import STAuthContainer from './components/STAuthContainer'
import Main from './components/Main'

class STError extends React.Component {
    render() {
        return (<div style="background-color:white;height:100%;width:100%">Not found</div>)
    }
}

class STApp extends React.Component {
    constructor() {
        super()
        this.state = {
            bodyClass : ''
        }

        this.bodyClass = this.bodyClass.bind(this)
    }

    bodyClass(cls = '') {
        document.body.classList.replace(this.state.bodyClass,cls)
        return Object.assign(this.state,{bodyClass:cls})
    }
    
    render() {
        <GlobalState.Provider>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/all-your-base-are-belong-to-us' component={allYourBase} />
                    <Route path='/signup' component={Signup} />
                    <Route path='/notfound' component={STError} />
                    <Route component={STAuthContainer}>
                        <Route path='/login' />
                        <Route path='/' component={Main} />
                    </Route>
                </Switch>
            </BrowserRouter>
        </GlobalState.Provider>
    }
}

ReactDOM.render(
    <STApp/>,
    document.getElementById('stApp')
)