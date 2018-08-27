import * as _st from '../../classes/st'

export default function initSession(plan) {
    console.log(plan)
    var plans = _st.plans
    this.setState({
        step: 1,
        init: true
    })
    return null
}