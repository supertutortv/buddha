import React from 'react'
import Login from './Login'
import Main from './Main'
import STModal from './STModal'

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
        const {history: hist, location: loc, match} = this.props;
        if (this.state.loggedIn === null) return null

        if (this.state.loggedIn) {
            if (loc.pathname === '/login') hist.replace('/dashboard')
            return (
                <Main {...this.props} />
            )
        } else {
            localStorage.removeItem('stCourseData')
            if (0 > match.path.indexOf('/login') && 0 > match.path.indexOf('/password/reset')) hist.replace('/login')
            return (
                <STModal>
                    <Login setLoggedIn={this.logThatFuckerIn} {...this.props} />
                </STModal>
            )
        }
    }
}