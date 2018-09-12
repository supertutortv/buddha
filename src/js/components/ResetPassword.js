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

const ResetForm = () => {

}

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            sent: false,
            reset: false,
            sentMsg: '',
            error: {
                id: '',
                message: ''
            }
        }

        this.sendReset = this.sendReset.bind(this)
    }

    componentDidMount() {
        _st.bodyClass = 'passwordReset'
        if (this.props.match.params.key) return console.log(this.props.match.params.key)
        
        _st.loading = false
    }

    componentDidUpdate() {
        _st.loading = false
    }

    sendReset(e) {
        _st.loading = true
        e.preventDefault()
        var formData = new FormData(e.target),
            obj = {}

        for(var pair of formData.entries()) {
            obj[pair[0]] = pair[1]
        }
        
        _st.http.post('/auth/reset',obj,(d) => {
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
                    {this.state.reset ? <ResetForm /> : <SendForm {...this.state} />}
                </form>
            </STDialogCentered>
        )
    }
}