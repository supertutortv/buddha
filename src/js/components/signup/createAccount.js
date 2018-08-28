import * as _st from '../../classes/st'

export default function createAccount(e) {
    e.preventDefault()
    var session = this.state.session
    console.log(session.customer.account)
}