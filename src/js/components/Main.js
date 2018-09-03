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
    }

    async componentDidMount() {
        if (this.state.data === null) {
            let d = await _st.get('/courses/data',(h) => console.log(h))
        }
        else if (typeof this.state.data === 'string')
            this.setState({
                data: JSON.parse(this.state.data)
            })

        _st.bodyClass = 'main'
        this.setState({ loading: false })
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