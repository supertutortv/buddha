import React from 'react'
import STDialogCentered from './STDialogCentered'

const SendForm = ({sent, sentMsg}) => {
    if (sent) {
        return (
            <div className="stResetSent">
                <strong>{sentMsg}</strong>
            </div>
        )
    } else {
        return (
        <React.Fragment>
            <div className="stPasswordHeader">
                <h1>Forgot your password?</h1>
            </div>
            <div className="stPasswordCredentials">
                <div className="input-field">
                    <input className="browser-default validate email" type="email" name="email" placeholder="Email Address" required />
                </div>
            </div>
            <div className="stFormButtons">
                <button className="stFormButton btn waves-effect waves-light">Send reset link</button>
            </div>
        </React.Fragment>
        )
    }
}

const ResetForm = ({passMatch,sent}) => {
    if (sent) {
        return (
            <div className="stResetSent">
                <strong>{sentMsg}<Link to="/login">Sign In</Link></strong>
            </div>
        )
    } else {
        return (
            <React.Fragment>
                <div className="stPasswordHeader">
                    <h1>Enter your new password</h1>
                </div>
                <div className="stPasswordCredentials">
                    <div className="input-field">
                        <input className="browser-default validate" id="password1" type="password" name="password1" placeholder="New Password" required />
                    </div>
                    <div className="input-field">
                        <input className="browser-default validate" id="password2" type="password" name="password2" placeholder="Confirm Password" onBlur={passMatch} required />
                    </div>
                </div>
                <div className="stFormButtons">
                    <button className="stFormButton btn waves-effect waves-light">Change password</button>
                </div>
            </React.Fragment>
        )
    }
}

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
        _st.bodyClass = 'passwordReset'
        if (this.props.match.params.key)
            _st.http.get('/auth/reset?key='+this.props.match.params.key,(d) => {
                if (d.code === 'pwError')
                    this.props.history.replace('/password/reset')
                else
                    obj = {
                        reset: true,
                        key: this.props.match.params.key
                    }
            })

        this.setState(Object.assign({init:true},obj))
        _st.loading = false
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
        var formData = new FormData(e.target),
            obj = this.state.reset ? {key: this.state.key} : {},
            method = this.state.reset ? 'put' : 'post'

        for(var pair of formData.entries()) {
            obj[pair[0]] = pair[1]
        }
        
        _st.http[method]('/auth/reset',obj,(d) => {
            console.log(d)
            /* if (d.code === 'resetError') return this.setState({
                error: {
                    id: d.code,
                    message: d.message
                }
            })

            this.setState({
                sent: true,
                sentMsg: d.message
            }) */
        })
    }

    render() {
        console.log(this.state)
        if (!this.state.init) return null
        return (
            <STDialogCentered error={this.state.error}>
                <form id="stPasswordWrapper" className="stFormWrapper" onSubmit={this.sendReset}>
                    {this.state.key ? <ResetForm {...this.state} passMatch={this.passMatch}/> : <SendForm {...this.state} />}
                </form>
            </STDialogCentered>
        )
    }
}