import * as _st from '../../classes/st'

export default function initSession(plan) {
    var planId = (typeof plan === 'string') ? plan : plan.target.id.replace('stPlan-',''),
        thePlan = {}

    _st.plans.some((obj) => {
        if (obj.id === planId || obj.slug === planId)
            return thePlan = obj
    })
    console.log(this.state.params)
    if (Object.keys(thePlan).length) {
        this.setState({
            step: 1,
            init: true
        })
    } else {
        this.props.history.replace('/signup')
        return this.plans()
    }
    return null
}