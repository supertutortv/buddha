import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { GlobalState, DataState } from './StateContext'
import Header from './Header'
import Sidebar from './Sidebar'
import Course from './Course'

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data : {},
            loading : true
        }
    }

    componentDidMount() {
        _st.bodyClass = 'main'

        this.setState({ loading: false })
    }

    render() {
        _st.loading = this.state.loading
        return(
            <DataState.Provider value={this.state.data}>
                <div id="stAppInner" className={this.state.loading ? 'loading' : 'active'}>
                    <Header />
                    <main id="stAppStage">
                        <Switch>
                            <Route exact path='/dashboard' render={() => 
                                <div>Dashboard</div>
                            } />
                            <Route exact path='/:course(the-best-act-prep-course-ever|the-best-sat-prep-course-ever)/:section?' render={props => <Course {...props} />} />
                            <Route exact path='/' render={() => <Redirect to="/dashboard" />} />
                            <Route path="/*" render={() => null} />
                        </Switch>
                    </main>
                </div>
            </DataState.Provider>
        )
    }
}