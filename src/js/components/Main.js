import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { GlobalState, DataState } from '../utilities/StateContext'
import Header from './Header'
import Sidebar from './Sidebar'
import Course from './Sidebar'
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
        this.global.bodyClass('main')

        if (this.data)
            this.setState({
                loading: false
            })
    }

    render() {
        return(
            <GlobalState.Consumer>
                {global => {
                    _st.loading(this.state.loading)
                    this.global = global
                    return (
                        <DataState.Consumer>
                            {data => {
                                this.data = data
                                return (
                                <div id="stAppInner" className={this.state.loading ? 'loading' : 'active'}>
                                    <Header />
                                    <Sidebar />
                                    <main id="stAppStage">
                                        <Switch>
                                            <Route exact path='/dashboard' render={() => 
                                                <div>Dashboard</div>
                                            } />
                                            <Route exact path='/:course(the-best-act-prep-course-ever|the-best-sat-prep-course-ever)' component={Course} />
                                            <Route exact path='/' render={() => <Redirect to="/dashboard" />} />
                                            <Route path="/" render={() => <Redirect to="/notfound" />} />
                                        </Switch>
                                    </main>
                                </div>
                                )
                            }}
                        </DataState.Consumer>
                    )
                }}
            </GlobalState.Consumer>
        )
    }
}