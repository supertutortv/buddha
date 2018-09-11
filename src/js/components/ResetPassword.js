import React from 'react'
import STStrippedWrapper from './STStrippedWrapper'

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
        console.log(e.target)
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
            <form id="stPasswordWrapper" className="stFormWrapper row" onSubmit={this.sendReset}>
                <div id="stPasswordHeader" className="stFormHeader col s12">
                    <h1>Reset your password</h1>
                </div>
                <div id="stLoginCredentials" className="col s12">
                    <div className="input-field col s12">
                        <input className="browser-default validate email" type="email" name="username" placeholder="Email Address" />
                    </div>
                </div>
                <div className="stFormButtons col s12">
                    <button className="stFormButton btn waves-effect waves-light">Reset your password</button>
                </div>
            </form>
        )
    }
}