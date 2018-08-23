import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './Login'
import Four04 from './Four04'

export default class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return(
            <main id="stAppStage">
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/' render={() => <Redirect to="/dashboard" />} />
                    <Route path='/dashboard' component={Login} />
                    <Route path="/*" component={Four04} />
                </Switch>
            </main>
        )
    }
}