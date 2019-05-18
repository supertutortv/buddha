import React from 'react'
import Login from './Login'
import Signup from './Signup'
import Main from './Main'

export default class Gateway extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: null
        }

        this.logThatFuckerIn = this.logThatFuckerIn.bind(this)
        this.authCheck = this.authCheck.bind(this)
    }

    componentDidMount() {
        _st.bodyClass = 'gateway '+this.props.location.pathname.split('/')[0]
    }

    authCheck() {
        if (this.state.loggedIn === null) {
            _st.http.post('/auth/verify',{},(d) => {
                this.setState({
                    loggedIn: d.data
                })
            })
        }
        return null
    }

    logThatFuckerIn() {
        this.setState({
            loggedIn: true
        })
    }

    render() {
        const {history: hist, location: loc} = this.props

        if (this.state.loggedIn === null) return this.authCheck()

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