import React from 'react'
import Login from './Login'
import Main from './Main'

export default class Gateway extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: null
        }

        this.logThatFuckerIn = this.logThatFuckerIn.bind(this)

        _st.bodyClass = 'login'
    }

    componentDidMount() {
        if (this.state.loggedIn === null) {
            _st.http.post('/auth/verify',{},(d) => {
                this.setState({
                    loggedIn: d.data
                })
            })
        }
    }

    logThatFuckerIn() {
        this.setState({
            loggedIn: true
        })
    }

    render() {
        const {history: hist, location: loc} = this.props

        if (loc.pathname.indexOf('signup') > -1) {

        }
        if (this.state.loggedIn === null) return null

        if (this.state.loggedIn) {
            if (loc.pathname === '/login' || (loc.pathname === '/dashboard' && loc.search)) hist.replace('/dashboard')
            return (
                <Main {...this.props} />
            )
        } else {
            localStorage.removeItem('stCourseData')
            if (loc.pathname !== '/login' && loc.pathname !== '/password/reset') hist.replace('/login')
            return (
                <Login setLoggedIn={this.logThatFuckerIn} {...this.props} />
            )
        }
    }
}