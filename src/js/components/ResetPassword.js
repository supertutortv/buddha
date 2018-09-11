import React from 'react'
import STStrippedWrapper from './STStrippedWrapper'

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            sent: false,
            error: {
                id: '',
                message: ''
            }
        }
    }

    componentDidMount() {
        //if (this.props.match.params.key)
        _st.bodyClass = 'passwordReset'
        _st.loading = false
    }

    render() {
        if (this.props.match.params.key) return null
        return (
            <form id="stPasswordWrapper" className="stFormWrapper row">
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