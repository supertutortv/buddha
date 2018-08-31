import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { GlobalState } from './utilities/StateContext'
import ResetPassword from './components/ResetPassword'
import allYourBase from './components/allYourBase'
import Signup from './components/Signup'
import STAuthContainer from './components/STAuthContainer'
import * as _st from './classes/st'

window._st = _st

class STError extends React.Component {
    render() {
        return (
            <GlobalState.Consumer>
                {global => {
                    global.bodyClass('notfound')
                    return (
                        <div style={{backgroundColor:'white',height:'100%',width:'100%'}}>Not found</div>
                    )
                }}
            </GlobalState.Consumer>
        )
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
        Object.assign(this.state,{bodyClass:cls})
        return document.body.className = this.state.bodyClass
    }
    
    render() {
        return (
        <GlobalState.Provider value={this}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/all-your-base-are-belong-to-us' component={allYourBase} />
                    <Route path='/password/reset' component={ResetPassword} />
                    <Route path='/signup' component={Signup} />
                    <Route path='/notfound' component={STError} />
                    <Route component={STAuthContainer}>
                        <Route path='/login' />
                        <Route path='/password' />
                        <Route path='/' />
                    </Route>
                </Switch>
            </BrowserRouter>
        </GlobalState.Provider>
        )
    }
}

ReactDOM.render(
    <STApp/>,
    document.getElementById('stApp')
)