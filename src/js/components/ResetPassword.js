import React from 'react'
import STDialogCentered from './STDialogCentered'

const SendForm = ({sent, sentMsg}) => {
    if (sent) {
        return (
            <div className="stResetSent"><strong>{sentMsg}</strong></div>
        )
    } else {
        return (
        <React.Fragment>
            <div className="stPasswordHeader">
                <h1>Reset your password</h1>
            </div>
            <div className="stPasswordCredentials">
                <div className="input-field">
                    <input className="browser-default validate email" type="email" name="email" placeholder="Email Address" required />
                </div>
            </div>
            <div className="stFormButtons">
                <button className="stFormButton btn waves-effect waves-light">Reset your password</button>
            </div>
        </React.Fragment>
        )
    }
}

const ResetForm = ({passMatch}) => {
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

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            sent: false,
            reset: false,
            key: null,
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
        if (this.props.match.params.key)
            return _st.http.get('/auth/reset?key='+this.props.match.params.key,(d) => {
                if (d.code === 'pwError')
                    this.props.history.replace('/password/reset')
                else
                    this.setState({
                        key: this.props.match.params.key
                    })
            })
        _st.bodyClass = 'passwordReset'
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
        var formData = new FormData(e.target),
            obj = {},
            method = this.state.reset ? 'put' : 'post'

        for(var pair of formData.entries()) {
            obj[pair[0]] = pair[1]
        }
        
        _st.http[method]('/auth/reset',obj,(d) => {
            if (d.code === 'signupError') return this.setState({
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
        if (this.props.match.params.key) return null
        return (
            <STDialogCentered error={this.state.error}>
                <form id="stPasswordWrapper" className="stFormWrapper" onSubmit={this.sendReset}>
                    {this.state.reset ? <ResetForm passMatch={this.passMatch}/> : <SendForm {...this.state} />}
                </form>
            </STDialogCentered>
        )
    }
}