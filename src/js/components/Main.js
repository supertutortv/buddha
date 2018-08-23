import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Login from './Login'
import Four04 from './Four04'

export default class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        console.log(this.props)
        return(
            <div id="stAppInner" className={this.state.loading ? 'loading' : 'active'}>
                <Header />
                <Sidebar />
                <main id="stAppStage">
                    <Switch>
                        <Route path='/dashboard' component={Login} />
                        <Route exact path='/' render={() => <Redirect to="/dashboard" />} />
                        <Route path="/*" component={Four04} />
                    </Switch>
                </main>
                {this.state.redirect && (
                    <Redirect to={this.state.redirectTo}/>
                )}
            </div>
        )
    }
}