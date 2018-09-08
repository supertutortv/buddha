// changeStep
export function changeStep(inc = true,e) {
    if (typeof e !== 'undefined') e.preventDefault()
    var obj = (typeof inc === 'object') ? inc : {},
        prevState
    this.setState((prev) => {
        prevState = prev
        return {
            step : (inc) ? this.state.step + 1 : this.state.step - 1,
            obj
        }
    }, () => this.props.history.push({
        pathname:'/signup/'+this.steps[this.state.step].toLowerCase(),
        state: prevState
    }))
    return null
}

// createAccount
export function createAccount(e) {
    e.preventDefault()
    _st.loading = true
    var account = this.state.session.customer.account
    _st.http.post('/signup/account',account,(d) => {
        if (d.code === 'signupError') return this.setState({
            error: {
                id: d.code,
                message: d.message
            }
        })

        console.log(d.update)

        /* console.log(Object.assign(this.state.session.customer,{
            customer: d.update
        })) */

        return this.changeStep({
            session: Object.assign(this.state.session,{
                customer: d.update
            }),
            stripe: this.initPayment()
        })
    })
}

// initPayment
export function initPayment() {
    return window.Stripe ? window.Stripe(_st.stripe) : null
}

//setPlan
export function setPlan(e) {
    e.preventDefault()
    return this.changeStep({
        plan: JSON.parse(e.currentTarget.getAttribute('data-obj'))
    })
}

// submitPayment
export function submitPayment() {
    _st.http.post('/signup/pay',dt,cb)
}

// updateInp
export function updateInp({target: el}) {
    this.state.update = false
    this.setState(prev => {
        var params = el.name.split('|'),
            newObj = {[params[0]] : {...prev.session[params[0]]}}

            params.reduce((obj,key,i,arr) => {
                if (i+1 === arr.length) obj[key] = el.value
                else return obj[key]
            },newObj)
        return Object.assign(prev.session,newObj)
    },() => this.state.update = true)
}