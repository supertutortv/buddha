import React from 'react'
import { Link } from 'react-router-dom'

const thedate = new Date

export default class Signup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: {
                id: '',
                message: ''
            },
            init: false
        }

        _st.bodyClass = 'signup'
    }

    componentDidMount() {

        let {history, match} = this.props,
            {plan} = match.params || '',
            query = (history.location.search.indexOf('?') > -1) ? '&'+history.location.search.substring(1) : ''

        if (plan) history.replace('/signup?crs='+plan+query)
        
        _st.loading = false
    }

    componentDidUpdate() {
        _st.loading = false
    }

    componentWillReceiveProps(nextProps) {
        var { history: hist } = nextProps
        if (hist.action === 'POP') this.setState(this.props.location.state)
    }

    createAccount(e) {
        e.preventDefault()
        let {history: hist} = this.props
        
        _st.loading = true
        let form = Array.from(e.target.querySelectorAll('input')),
            obj = {}
    
        for (let i = 0; form.length > i; i++)
            obj[form[i].name] = form[i].value
    
        _st.http.post('/signup/account',obj,(d) => {
            if (d.code === 'signupError') return this.setState({
                error: {
                    id: d.code,
                    message: d.message
                }
            })
            hist.replace('/login/'+hist.location.search)
        })
    }

    render() {
        let { error } = this.state,
            {history: hist} = this.props,
            msg = <div className="stAccountErrors"><strong>{error.message}</strong></div>

        return(
            <React.Fragment>
                <main className="stSignupAccount">
                    <div className="stSignupInner">
                        <form role="form" className="stAccountForm" onSubmit={this.createAccount}>
                            <header className="heading">
                                <h1>SupertutorTV</h1>
                            </header>
                            <section className="stC2A">
                                <h2>Sign up for free right now to get started on your test prep journey!</h2>
                            </section>
                            <fieldset className="stAccountBody">
                                <div className="stIfR99">
                                    <input autocomplete="off" aria-label="Student First Name" type="text" name="firstname" required />
                                    <label aria-hidden="true" for="firstname">Student First Name</label>
                                </div>
                                <div className="stIfR99">
                                    <input autocomplete="off" aria-label="Student Last Name" className="browser-default validate" type="text" name="lastname" required/>
                                    <label aria-hidden="true" for="lastname">Student Last Name</label>
                                </div>
                                <div className="stIfR99">
                                    <input autocomplete="off" aria-label="Student Email" className="browser-default validate email" type="email" name="email" required validation="email"/>
                                    <label aria-hidden="true" for="email">Student Email</label>
                                </div>
                                <div className="stIfR99">
                                    <input autocomplete="off" aria-label="Password" className="browser-default validate" type="password" name="password" required/>
                                    <label aria-hidden="true" for="password">Password</label>
                                </div>
                            </fieldset>
                            <div className="stAccountButtons">
                                <button type="submit" className="stAccountButton btn" ><span>Create Your Account</span></button>
                            </div>
                            {(error.message) ? msg : null}
                            <section className="stDisclaimer">
                                <span>By creating an account, you agree to our <a href="https://supertutortv.com/terms-and-conditions" target="_blank">Terms</a> and our <a href="https://supertutortv.com/privacy-policy" target="_blank">Privacy Policy</a></span>
                            </section>
                        </form>
                        <code className="insteadLogin">Already have an account? <Link to={'/login'+hist.location.search}>Log In</Link></code>
                    </div>
                </main>
                <footer role="contentinfo">
                    <mark>© {thedate.getFullYear()} Supertutor Media, Inc.</mark>
                    <nav>Some links</nav>
                </footer>
            </React.Fragment>
        )
    }
}