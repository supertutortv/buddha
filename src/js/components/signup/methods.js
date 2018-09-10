// calculatePricing
export function calculatePricing() {
    var items = [],
        plan = this.state.plan,
        pricing = this.state.pricing

    pricing.total = parseInt(plan.price)
    pricing.taxable = parseInt(plan.taxable)
    items.push({name: plan.name, amt: plan.price})

    var disc = pricing.coupon.value.match(/\\$([0-9]+)/) || ['0','0'],
    discp = pricing.coupon.value.match(/([0-9]+)%/) || ['0','0'],
    discprice = pricing.total*(parseInt(discp[1])/100) || parseInt(disc[1])

    if ( discprice > 0 ) {
        pricing.total -= discprice
        items.push({name: 'Discount ('+pricing.coupon.id+')', amt: '-'+discprice})
    }

    if ( pricing.tax.value > 0 ) {
        let taxxx = (pricing.taxable*pricing.tax.value)/100
        pricing.total += taxxx
        items.push({name: pricing.tax.id, amt: taxxx})
    }

    if ( pricing.shipping > 0 ) {
        pricing.total += pricing.shipping
        items.push({name: 'Priority Shipping', amt: pricing.shipping})
    }

    this.state.items = items
}

// changeStep
export function changeStep(inc = true,e) {
    if (typeof e !== 'undefined') e.preventDefault()
    var obj = (typeof inc === 'object') ? inc : {},
        prevState
    this.setState((prev) => {
        prevState = prev
        return {
            step : (inc) ? this.state.step + 1 : this.state.step - 1,
            ...obj
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
    _st.http.post('/signup/account',this.state.customer.account,(d) => {
        if (d.code === 'signupError') return this.setState({
            error: {
                id: d.code,
                message: d.message
            }
        })

        return this.changeStep({
            customer: Object.assign(this.state.customer,d.update)
        })
    })
}

// setChecker
export function setChecker(el) {
    var tar = el.target, 
        val = tar.value,
        p = tar.classList.contains('tax') ? 'tax' : 'coupon'

        tar.classList.remove('valid','invalid')

    if (tar.type === 'checkbox') {
        let params = tar.name.split('|')
        this.setState({
            customer: Object.assign(this.state.customer,{
                options: Object.assign(this.state.customer.options,{
                    [params[params.length-1]] : tar.checked
                })
            })
        })
    } else {
        if (val === '') {
            this.state.pricing[p].value = val
        }

        if (val !== this.state.pricing[p].value)
            _st.http.get('/signup/check?'+p+'='+val+'&sig='+this.state.signature, (d) => {
                if (d.code === 'signup_error') {
                    tar.classList.add('invalid')
                    this.setState({error: {id: d.code, message: d.message}})
                    return false
                }
                this.setState({pricing: Object.assign(this.state.pricing,{[p]: d.update})})
            })

        this.updateInp(el)
    }
    this.validate()
    return true
}

// setPlan
export function setPlan(e) {
    e.preventDefault()
    return this.changeStep({
        plan: JSON.parse(e.currentTarget.getAttribute('data-obj'))
    })
}

// setOutcome
export function setOutcome( result ) {
    if (typeof result !== 'undefined') {
        if (typeof result.error !== 'undefined') return this.setState({
            card: false,
            error: {
                id: 'stripeError',
                message: result.error.message
            }
        })
        this.state.card = !result.empty && result.complete
    }

    this.validate()
}

export function setShipping(el) {
    this.state.update = false
    this.setChecker(el)
    this.state.update = true
    this.setState({
        pricing: Object.assign(this.state.pricing,{shipping: el.target.checked ? 705 : 0})
    })
}

// submitPayment
export function submitPayment(stripe) {
    if (typeof stripe === 'undefined') return false
    stripe.createToken().then((t) => console.log(t))
    /* _st.http.post('/signup/pay',dt,cb) */
}

// toPrice
export function toPrice(amt = 0) {
    return (Math.round(amt)/100).toFixed(2)
}

// updateInp
export function updateInp({target: el}) {
    this.state.update = false
    this.setState(prev => {
        var params = el.name.split('|'),
            newObj = {[params[0]] : {...prev[params[0]]}}

            params.reduce((obj,key,i,arr) => {
                if (i+1 === arr.length) obj[key] = el.value
                else return obj[key]
            },newObj)
        return Object.assign(prev,newObj)
    },() => this.state.update = true)
}

// validate
export function validate() {
    var err = false,
        inp = Array.from(document.querySelectorAll('input, select'))

    inp.some((el) => {
        if ( (el.hasAttribute('required') && ( !el.value || el.classList.contains('invalid') )) || el.classList.contains('invalid') ) {
            el.classList.add('invalid')
            return err = true
        }
        return false
    })

    this.setState({
        valid: this.state.card && this.state.customer.options.terms && !err
    })
}