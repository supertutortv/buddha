export default function createAccount() {
    var account = this.state.session.customer.account
    console.log(account)
    return false
    /* _st.signup.account(account,(d) => {
        if (d.code === 'signupError') return this.setState({
            error: {
                id: d.code,
                message: d.message
            }
        })

        Object.assign(this.state.session.customer,d.update)
        this.changeStep()
    }) */
}