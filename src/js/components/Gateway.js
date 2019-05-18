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
        if (this.state.loggedIn === null) return null
        const {history: hist, location: loc} = this.props

        if (this.state.loggedIn) {
            if (loc.pathname === '/login') hist.replace('/dashboard')
            return null
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