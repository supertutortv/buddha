import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { GlobalState } from './utilities/StateContext'
import ResetPassword from './components/ResetPassword'
import allYourBase from './components/allYourBase'
import Signup from './components/Signup'
import STAuthContainer from './components/STAuthContainer'
import * as _st from './classes/st'

const mount = document.getElementById('stApp')

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
            bodyClass : '',
            loading : true
        }
    }
    
    render() {
        console.log(this.props)
        document.body.className = this.state.bodyClass
        mount.classList.toggle('loading',this.state.loading)
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
                            <Route path='/' />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </GlobalState.Provider>
        )
    }
}

ReactDOM.render( <STApp/>, mount )