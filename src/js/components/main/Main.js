import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import Four04 from '../pages/Four04'

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect : false
        }
    }

    componentDidMount() {

    }

    render() {
        return(
            <div id="stAppInner" className={this.state.loading ? 'loading' : 'active'}>
                <Header />
                <Sidebar />
                <main id="stAppStage">
                    <Switch>
                        <Route path='/dashboard' render={
                            <div>Dashboard</div>
                        } />
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