import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import allYourBase from './allYourBase'
import Gateway from './Gateway'
import Signup from './Signup'
import ResetPassword from './ResetPassword'

export default class STApp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            something: true
        }
    }

    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/all-your-base-are-belong-to-us' component={allYourBase} />
                    {/* <Route exact path='/signup/:plan?' component={Signup} />
                    <Route exact path='/password/reset/:key?' component={ResetPassword} /> */}
                    <Route exact path={['/login','/password/reset/:key?','/signup/:plan?']} render={(p) => {
                        console.log(this.state.something)
                    }} />
                    <Route path='/' render={(p) => <Gateway {...p} />} />
                </Switch>
            </BrowserRouter>
        )
    }
}