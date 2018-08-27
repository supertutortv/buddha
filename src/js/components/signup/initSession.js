import * as _st from '../../classes/st'

export default function initSession(plan) {
    var plans = _st.plans
    return this.setState({
        step: 1,
        init: true
    })
}