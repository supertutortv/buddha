import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { DataState } from './courses/StateContext'
import Course from './courses/Course'
import Dashboard from './courses/Dashboard'

const STModal = ({active,modalActive}) => {
    if (!active)
        return null
    else
        return (
            <div className="stModal centered" onClick={(e) => console.log(e.target)}>
                <div className="stModalInner"></div>
            </div>
        )
}

export default class Main extends React.Component {
    constructor(props) {
        super(props)

        let sCD = localStorage.getItem('stCourseData') || false

        this.state = {
            data: !sCD || JSON.parse(sCD),
            loading: true,
            modal: false
        }

        this.dataSaveLocal = this.dataSaveLocal.bind(this)
        this.modalActive = this.modalActive.bind(this)

        //document.addEventListener( "contextmenu", (e) => e.preventDefault())
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

    modalActive(active = false) {
        this.setState({
            modal: active
        })
    }

    render() {
        if (this.state.data === true) return null

        return(
            <DataState.Provider value={this.state.data}>
                <Switch>
                    <Route exact path='/dashboard' component={Dashboard} />
                    <Route exact path='/' render={() => <Redirect to="/dashboard" />} />
                    <Route exact path='/:courses/:collections?/:collection?/:tests?' render={props => <Course modalActive={this.modalActive} {...props} />} />
                    <Route exact path='/playlists/:playlist?' render={props => <Course modalActive={this.modalActive} {...props} />} />
                </Switch>
                <STModal active={this.state.modal} modalActive={this.modalActive} />
            </DataState.Provider>
        )
    }
}