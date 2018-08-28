import * as _st from '../../classes/st'

export default function createAccount(e) {
    e.preventDefault()
    var account = this.state.session.customer.account
    console.log(account)
}