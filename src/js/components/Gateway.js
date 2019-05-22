import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import ResetPassword from './ResetPassword'
import Main from './Main'

const thedate = new Date

const Gateway = ({children}) =>
    <React.Fragment>
        <main className="stGatewayForm">
            <div className="stGatewayFormInner">{children}</div>
        </main>
        <footer role="contentinfo">
            <mark>© {thedate.getFullYear()} Supertutor Media, Inc.</mark>
            <nav>Some links</nav>
        </footer>
    </React.Fragment>

export default Gateway

/* export default class Gateway extends React.Component {
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
} */