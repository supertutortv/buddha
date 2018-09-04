import React from 'react'
import Login from './Login'
import Main from './Main'

export default class STSecured extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: null
        }

        this.logThatFuckerIn = this.logThatFuckerIn.bind(this)
    }

    componentDidMount() {
        if (this.state.loggedIn === null) {
            _st.auth.verify((d) => {
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
        const {history: hist, location: loc} = this.props;
        if (this.state.loggedIn === null) return null

        if (this.state.loggedIn) {
            if (loc.pathname === '/auth/token') hist.replace('/dashboard')
            return (
                <Main {...this.props} />
            )
        } else {
            localStorage.removeItem('stCourseData')
            if (loc.pathname !== '/auth/token' && loc.pathname !== '/auth/resetpw') hist.replace('/auth/token')
            return (
                <Login setLoggedIn={this.logThatFuckerIn} {...this.props} />
            )
        }
    }
}