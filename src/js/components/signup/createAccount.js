import * as _st from '../../classes/st'

export default function createAccount(e) {
    e.preventDefault()
    var account = this.state.session.customer.account
    _st.signup.account(account,(d) => {
        console.log(d)
        /* if (d.code === 'login_success') {
            let redir = this.state.redirectTo || '/dashboard'
            this.props.history.push(redir)
            this.setState({
                loggedIn: true,
                creds: {}
            })
            return null
        } */
    })
}