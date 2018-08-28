import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Four04 from './Four04'
import * as _st from '../classes/st'

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect : false,
            loading : true
        }
    }

    componentDidMount() {
        this.setState({
            loading: false
        })
    }

    render() {
        _st.loading(this.state.loading)
        return(
            <div id="stAppInner" className={this.state.loading ? 'loading' : 'active'}>
                <Header />
                <Sidebar />
                <main id="stAppStage">
                    <Switch>
                        <Route path='/dashboard' render={() => 
                            <div>Dashboard</div>
                        } />
                        <Route exact path='/' render={() => <Redirect to="/dashboard" />} />
                        <Route path="/*" render={() => <Redirect to="/notfound" />} />
                    </Switch>
                </main>
            </div>
        )
    }
}