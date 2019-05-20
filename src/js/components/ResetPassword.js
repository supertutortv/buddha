import React from 'react'
import { Link } from 'react-router-dom'

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            init: false,
            sent: false,
            reset: false,
            key: this.props.match.params.key || null,
            sentMsg: '',
            error: {
                id: '',
                message: ''
            }
        }

        this.sendReset = this.sendReset.bind(this)
        this.passMatch = this.passMatch.bind(this)
    }

    componentDidMount() {
        var obj = {}
        _st.bodyClass = 'gateway passwordReset'
        if (this.state.key !== null) {
            _st.http.get('/auth/reset?key='+this.props.match.params.key,(d) => {
                if (d.code === 'pwError') {
                    alert('The reset link is invalid. Please click "OK" and try again.')
                    this.props.history.replace('/password/reset')
                    return window.location.reload(true)
                }

                this.setState({
                    init: true,
                    reset: true,
                    key: this.props.match.params.key
                })
            })
        } else {
            this.setState({init:true})
        }        
    }

    componentDidUpdate() {
        _st.loading = false
    }

    passMatch() {
        let p1 = document.getElementById('password1'),
            p2 = document.getElementById('password2')
        p2.classList.remove('invalid')

        if (p2.value !== p1.value) return this.setState({
            error: {
                id: 'passNoMatch',
                message: 'The passwords do not match'
            }
        }, () => p2.classList.add('invalid'))
    }

    sendReset(e) {
        _st.loading = true
        e.preventDefault()

        this.state.error = {
            id: '',
            message: ''
        }
        var formData = e.target.querySelectorAll('input'),
            obj = this.state.reset ? {key: this.state.key} : {},
            method = this.state.reset ? 'put' : 'post'

        for(let el of formData) {
            obj[el.name] = el.value
        }
        
        _st.http[method]('/auth/reset',obj,(d) => {
            if (d.code === 'resetError') return this.setState({
                error: {
                    id: d.code,
                    message: d.message
                }
            })

            this.setState({
                sent: true,
                sentMsg: d.message
            })
        })
    }

    render() {
        let {key, error, init, reset, sent, sentMsg} = this.state

        if (!init) return null
        
        return (
            <React.Fragment>
                <main className="stGatewayForm">
                    <div className="stGatewayFormInner">
                        <form role="form" className="stAccountForm" onSubmit={this.sendReset}>
                            <header className="heading">
                                <h1>SupertutorTV</h1>
                            </header>
                            {sent ? 
                                <section className="stC2A">
                                    <h2>{sentMsg} <Link to="/login">{key ? 'L' : '<< Back to l'}ogin</Link></h2>
                                </section>
                                : <React.Fragment>
                                    <section className="stC2A">
                                        <h2>{key ? 'Enter your new password' : 'Forgot your password?'}</h2>
                                    </section>
                                    <fieldset className="stAccountBody">
                                        {key ? <React.Fragment>
                                                <div className="stIfR99">
                                                    <input autocomplete="off" aria-label="New Password" className="validate" type="password" id="password1" name="password1" required/>
                                                    <label aria-hidden="true" for="password1">New Password</label>
                                                </div>
                                                <div className="stIfR99">
                                                    <input autocomplete="off" aria-label="Confirm Password" className="validate" type="password" id="password2" name="password2" onBlur={this.passMatch} required/>
                                                    <label aria-hidden="true" for="password2">Confirm Password</label>
                                                </div>
                                            </React.Fragment>
                                            : <div className="stIfR99">
                                                <input autocomplete="off" aria-label="Email Address" className="validate email" type="email" name="email" required validation="email"/>
                                                <label aria-hidden="true" for="email">Email Address</label>
                                            </div>
                                        }
                                    </fieldset>
                                    <div className="stAccountButtons">
                                        <button type="submit" className="stAccountButton btn" ><span>{key ? 'Change Password' : 'Send Reset Link'}</span></button>
                                    </div>
                                </React.Fragment>
                            }
                            {(error.message)
                                ? <div className="stAccountErrors"><strong>{error.message}</strong></div>
                                : null
                            }
                        </form>
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