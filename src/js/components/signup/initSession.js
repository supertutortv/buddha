import * as _st from '../../classes/st'

export default function initSession(plan) {
    var planId = (typeof plan === 'string') ? plan : plan.target.id
    console.log(planId)
    this.setState({
        step: 1,
        init: true
    })
    return null
}