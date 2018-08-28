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
    } else {
        Object.assign(this.state,{
            init: true,
            session: {
                valid: false,
                id: Date.now(),
                signature: btoa(navigator.userAgent+'|'+navigator.platform+'|'+navigator.product).replace(/=/g,''),
                card : {
                    valid : false,
                    obj : null
                },
                stripe : null,
                customer : {
                    account : {
                        email: '',
                        firstname: '',
                        lastname: '',
                        password: ''
                    },
                    plan : thePlan,
                    shipping : {},
                    billing : {},
                    token: ''
                },
                pricing : {
                    total : thePlan.price,
                    shipping : 0,
                    taxable : thePlan.taxable,
                    tax : {
                        id: '',
                        value: 0
                    },
                    coupon : {
                        id: '',
                        value: ''
                    }
                }
            }
        })
        this.changeStep()
    }
    return null
}