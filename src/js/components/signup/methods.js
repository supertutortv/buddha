// calculatePricing
export function calculatePricing() {
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
export function changeStep(inc = true,e) {
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
    this.setState({
        pricing: Object.assign(this.state.pricing,{shipping: el.target.checked ? parseInt(this.state.item.metadata.priship) : 0})
    })
    this.updateInp(el)
    this.calculatePricing()
    console.log(this.state)
}

// submitPayment
export function submitPayment(e,stripe) {
    e.preventDefault()

    if (typeof stripe === 'undefined') return false
    _st.loading = true

    var cus = this.state.customer
    stripe.createToken({name: cus.nameOnCard}).then(({token: t}) => {
        if (t.error) return this.setState({
            error: {
                id: 'stripeError',
                message: t.error.message
            }
        })

        cus.shipping.name = cus.account.firstname+' '+cus.account.lastname
        cus.token = t.id

        return _st.http.post('/signup/pay',this.state,(d) => {
            
            if (d.code === 'stripeError') {
                var ecode = d.data.decline_code || d.data.code
                return this.setState({
                    error: {
                        id: ecode,
                        message: d.data.message
                    }
                },() => _st.loading = false)
            }

            let res = d.response
            this.changeStep({
                thankYou: {
                    id: res.id.replace('in_','')
                }
            })
        })
        
    })
}

// toPrice
export function toPrice(amt = 0) {
    return (Math.round(amt)/100).toFixed(2)
}

// updateInp
export function updateInp({target: el}) {
    this.state.update = false
    if (el.type === 'checkbox') el.value = el.checked
    
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

// updateInp
export function updatePrice({target: el}) {
    this.setState(prev => {
        return Object.assign(prev,{plan: prev.item.plans[el.value]})
    })
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
        el.classList.remove('invalid')
        return false
    })

    this.setState({
        valid: this.state.card && this.state.customer.options.terms && !err
    })
}