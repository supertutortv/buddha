import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { DataState } from './courses/StateContext'
import Header from './Header'
import Course from './courses/Course'
import Dashboard from './courses/Dashboard'

export default class Main extends React.Component {
    constructor(props) {
        super(props)

        let sCD = localStorage.getItem('stCourseData') || false

        this.state = {
            data: !sCD || JSON.parse(sCD),
            loading : true
        }

        this.dataSaveLocal = this.dataSaveLocal.bind(this)
    }

    async componentDidMount() {
        _st.bodyClass = 'main'
        var obj = { loading: false }

        if (this.state.data === true) await _st.http.get('/courses/data',(h) => obj.data = h.data)

        this.setState(obj,() => this.dataSaveLocal())
    }

    componentDidUpdate() {
        _st.loading = false
        {/* <div id="stAppVidBlock" className="z-depth-2"></div> */}
    }

    dataSaveLocal() {
        return localStorage.setItem('stCourseData',JSON.stringify(this.state.data))
    }

    render() {
        if (this.state.data === true) return null

        return(
            <DataState.Provider value={this.state.data}>
                <div id="stAppInner">
                    <Header courseNav={true}/>
                    <main id="stAppStage" className={'row ' + this.state.loading ? 'loading' : 'active'}>
                        <Switch>
                            <Route exact path='/dashboard' component={Dashboard} />
                            <Route exact path='/:courses/:section?/:third?/:fourth?/:fifth?' render={props => <Course setState={this.setState} {...props} />} />
                            <Route exact path='/' render={() => <Redirect to="/dashboard" />} />
                        </Switch>
                    </main>
                </div>
            </DataState.Provider>
        )
    }
}