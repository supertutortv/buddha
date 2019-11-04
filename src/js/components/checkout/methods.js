// calculatePricing
function calculatePricing() {
    if (this.state.plan === null) this.state.plan = this.state.item.plans[0]
    var plan = this.state.plan,
        pricing = this.state.pricing

    pricing.total = plan.amount

    var disc = pricing.coupon.value.match(/\\$([0-9]+)/) || ['0','0'],
    discp = pricing.coupon.value.match(/([0-9]+)%/) || ['0','0'],
    discprice = pricing.total*(parseInt(discp[1])/100) || parseInt(disc[1])

    if ( discprice > 0 ) pricing.total -= discprice

    if ( pricing.shipping > 0 ) pricing.total += pricing.shipping
}

// changeStep
function changeStep(inc = true,e) {
    if (typeof e !== 'undefined') e.preventDefault()
    var obj = (typeof inc === 'object') ? inc : {},
        prevState
    this.setState((prev) => {
        return {
            step : prev.step + 1,
            ...obj
        }
    })
    return null
}

// setChecker
function setChecker(el) {
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
            _st.http.get('/signup/check?'+p+'='+val+'&sig='+this.state.session.signature, (d) => {
                console.log(d)
                if (d.code === 'signup_error') {
                    tar.classList.add('invalid')
                    this.setState({error: {id: d.code, message: d.message}})
                    return false
                }
                this.setState({
                    pricing: Object.assign(this.state.pricing,{[p]: d.update}),
                    error: {
                        id: '',
                        message: ''
                    }
                })
            })

        this.updateInp(el)
    }
    this.validate()
    return true
}

// submitPayment
function submitPayment(e,stripe) {
    e.preventDefault()

    if (typeof stripe === 'undefined') return false
    _st.loading = true

    var cus = this.state.customer
}