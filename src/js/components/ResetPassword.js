import React from 'react'
import { Link } from 'react-router-dom'
import STDialogCentered from './STDialogCentered'

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

    componentDidMount() {}

    componentDidUpdate() {
        _st.loading = false
    }
    render() {
        
    }
}