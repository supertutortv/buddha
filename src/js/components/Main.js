import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { DataState } from './StateContext'
import Header from './Header'
import Course from './Course'

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data : localStorage.getItem('stCourseData'),
            loading : true
        }

        this.dataSaveLocal = this.dataSaveLocal.bind(this)
    }

    async componentDidMount() {
        var tData = ''
        if (this.state.data === null)
            await _st.http.get('/courses/data',(h) => tData = h.data)
        else if (typeof this.state.data === 'string')
            tData = JSON.parse(this.state.data)

        _st.bodyClass = 'main'
        this.setState({
            data: tData,
            loading: false
        },() => this.dataSaveLocal())
    }

    dataSaveLocal() {
        return localStorage.setItem('stCourseData',JSON.stringify(this.state.data))
    }

    render() {
        _st.loading = this.state.loading
        return(
            <DataState.Provider value={this.state.data}>
                <div id="stAppInner" className={this.state.loading ? 'loading' : 'active'}>
                    <Header />
                    <main id="stAppStage" className="row">
                        <Switch>
                            <Route exact path='/dashboard' render={() => 
                                <div id="stAppVidBlock" className="z-depth-2"></div>
                            } />
                            <Route path='/:course' render={props => <Course {...props} />} />
                            <Route exact path='/' render={() => <Redirect to="/dashboard" />} />
                        </Switch>
                    </main>
                </div>
            </DataState.Provider>
        )
    }
}