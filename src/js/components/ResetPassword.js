import React from 'react'
import STDialogCentered from './STDialogCentered'

const SendForm = () => {

}

const ResetForm = () => {

}

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            sent: false,
            creds: {},
            error: {
                id: '',
                message: ''
            }
        }

        this.sendReset = this.sendReset.bind(this)
    }

    componentDidMount() {
        //if (this.props.match.params.key)
        _st.bodyClass = 'passwordReset'
        _st.loading = false
    }

    componentDidUpdate() {
        _st.loading = false
    }

    sendReset(e) {
        e.preventDefault()
        var formData = new FormData(e.target),
            obj = {}

        for(var pair of formData.entries()) {
            obj[pair[0]] = pair[1]
        }
        console.log(obj)
        /* _st.http.post('/auth/reset',this.state.customer.account,(d) => {
            if (d.code === 'signupError') return this.setState({
                error: {
                    id: d.code,
                    message: d.message
                }
            })
        }) */
    }

    render() {
        if (this.props.match.params.key) return null
        return (
            <STDialogCentered error={this.state.error}>
                <form id="stPasswordWrapper" className="stFormWrapper" onSubmit={this.sendReset}>
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
                </form>
            </STDialogCentered>
        )
    }
}