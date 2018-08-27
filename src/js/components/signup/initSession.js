import * as _st from '../../classes/st'

export default function initSession(plan) {
    var planId = (typeof plan === 'string') ? plan : plan.target.id.replace('stPlan-',''),
        thePlan = {}

    _st.plans.some((obj) => {
        if (obj.id === planId || obj.slug === planId)
            return thePlan = obj
    })
    
    if (!Object.keys(thePlan).length) {
        delete this.state.params.plan
        this.props.history.replace('/signup')
    }

    this.setState({
        step: 1,
        init: true
    })
    return null
}