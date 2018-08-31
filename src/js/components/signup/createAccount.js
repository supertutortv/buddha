import * as _st from '../../_st'

export default function createAccount(e) {
    e.preventDefault()
    var account = this.state.session.customer.account
    _st.signup.account(account,(d) => {
        if (d.code === 'signupError') return this.setState({
            error: {
                id: d.code,
                message: d.message
            }
        })

        Object.assign(this.state.session.customer,d.update)
        this.changeStep()
    })
}