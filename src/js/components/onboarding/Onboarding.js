import React from 'react'
import TextureImg from './texture'
import CountryDD from '../checkout/pieces/CountryDD'
import StateDD from '../checkout/pieces/StateDD'
import Checkout from '../Checkout'

const priceToString = (price) => '$'+(price/100).toFixed(2)

const PlnOptions = ({nextStep, plan, option}) => {
	return (
		<section id="step1" className="step">
			<div className="stStepContent">
				<div>
					<div className="stOnboardingOptions">
						<div className="ctaColumn">
							<span>You chose:</span><strong className="planTitle">{plan.title}</strong>
						</div>
						<div className="ctaColumn">
							<span>Now, choose the subscription length you want:</span>
						</div>
						{plan.options.map((opt) => {
							let active = (typeof option !== 'undefined' && option === opt) ? 'active' : null
							return (
								<div className="stOnboardingOption">
									<button className={["optionInner",active].join(' ')} onClick={(e) => {
										e.preventDefault()
										nextStep({
											step: 2,
											loc: false,
											option: opt
										})
									}}>
										<span>
											{opt.length+' months - $'+(opt.price/100).toFixed(0)}
										</span>
									</button>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}

const Shipping = ({shipChanged,nextStep,ship,plan}) => {
	return (
		<section id="step2" className="step">
			<div className="stStepContent">
				<div>
					<label for="locSelect">Select your country</label>
					<div style={{position: 'relative'}}>
						<CountryDD className="locSelect" name="locSelect" onChange={(e) => {
							let val = e.target.value
							if (val === 'US')
								nextStep({step: 2, loc: false, shipping: true})
							else
								nextStep({step: 3, loc: val, shipping: false})
						}} required ><i class="fas fa-caret-down"></i></CountryDD>
					</div>
					{!ship ? null : <form className="shippingForm nopad big" onChange={shipChanged} onSubmit={(e) => {
						e.preventDefault()
						let obj = {
							country: 'US'
						},
						vals = e.target.querySelectorAll('input:not([type=radio]),select'),
						priShip = e.target.querySelector('[name=priShip]:checked').value

						for (let i = 0; i < vals.length; ++i) Object.assign(obj,{[vals[i].name]: vals[i].value})

						obj = Object.assign(obj,{priShip: priShip})
						nextStep({step: 3, loc: true, shipping: obj})
					}}>
						<div className="stIfR99 twoq left">
							<input aria-label="Address Line 1" className="validate address" type="text" name="line1" required validation="text"/>
							<label aria-hidden="true" for="line1">Address Line 1</label>
						</div>
						<div className="stIfR99 twoq right">
							<input aria-label="Address Line 2" className="address" type="text" name="line2"/>
							<label aria-hidden="true" for="line2">Address Line 2</label>
						</div>
						<div className="stIfR99 onet">
							<input required aria-label="City" validation="text" className="validate city" type="text" name="city"/>
							<label aria-hidden="true" for="city">City</label>
						</div>
						<div className="stIfR99 onet right select">
							<StateDD aria-label="State" validation="text" className="validate required state" name="state" required>
								<i class="fas fa-caret-down"></i>
							</StateDD>
						</div>
						<div className="stIfR99 onet right">
							<input required aria-label="Postal Code" validation="text" className="validate postal_code" type="text" name="postal_code"/>
							<label aria-hidden="true" for="postal_code">Postal Code</label>
						</div>
						<div className="stIfR99">
							<input required aria-label="Phone Number" validation="tel" className="validate phone" type="tel" name="phone"/>
							<label aria-hidden="true" for="phone">Phone Number</label>
						</div>
						<div className="shipOptBtn">
							<div>
								<span>Send my book(s) via</span>
								<span>
									<input id="priShipMedia" className="priShip" type="radio" name="priShip" value="false" required/>
									<label for="priShipMedia">Media Mail (2-3 weeks, FREE)</label>
								</span>
								<span>
									<input id="priShipPriority" className="priShip" type="radio" name="priShip" value="true"/>
									<label for="priShipPriority">Priority Mail (3-4 days, +{priceToString(plan.shipping)})</label>
								</span>
							</div>
							<button className="btn" type="submit">Continue</button>
						</div>
					</form>}
				</div>
			</div>
		</section>
	)
}

const Finalize = ({checkCoupon, nextStep, toggleCheckout, toggleTrial, refreshData, ...state}) => {
	let shipping = state.shipping && state.shipping.priShip === "true" ? state.plan.shipping : 0,
		price = state.option.price,
		couponClass = state.coupon.msg ? 'invalid' : state.coupon.id ? 'valid' : ''

	return (
		<section id="step3" className="step">
			<div className="stStepContent">
				<div>
					<aside className="stConfirmCard">
						<div className="stConfirmCardInner">
							<div className="reviewTable">
								<h3>Review Your Order<i class="fas fa-check-circle"></i></h3>
								<div>
									<div>Item</div>
									<div>Price</div>
								</div>
								<div>
									<div>{state.plan.title} - <em>{state.option.length+' months'}</em></div>
									<div>{priceToString(price)}</div>
								</div>
								{!shipping ? null : <div>
									<div>Priority Shipping <em>(3-4 days)</em></div>
									<div>{priceToString(shipping)}</div>
								</div>}
								<div>
									<div className="stIfR99">
										<input id="coupon" aria-label="Coupon" className={['validate','coupon',couponClass].join(' ')} type="text" name="coupon"/>
										<label aria-hidden="true" for="coupon">{state.coupon.msg}</label>
									</div>
									<div>
										<button className="couponChecker" onClick={checkCoupon}>
											<span>Apply</span>
										</button>
									</div>
								</div>
								<div>
									<div>
										<input aria-label="I would like the free 5 day limited trial, please!" className="doTrial" type="checkbox" name="doTrial" onChange={(e) => {
											toggleTrial(e.target.checked)
										}}/>
										<label aria-hidden="true" for="doTrial">I would like the FREE 5 day limited trial, please!</label>
									</div>
									<div>{priceToString(price-state.coupon.val+shipping)}</div>
								</div>
							</div>
							<div className="initCheckoutFinal">
								<button className="initCheckoutBtn" onClick={toggleCheckout}><span>Checkout</span></button>
							</div>
						</div>
					</aside>
				</div>
			</div>
			{!state.checkout ? null : <Checkout action="/signup/pay" amt={priceToString(price+shipping)} closeCheckout={toggleCheckout} payload={state} refreshData={refreshData} nextStep={nextStep}/>}
		</section>
	)
}

export default class Onboarding extends React.Component{
    constructor(props) {
		super(props)
		
		let saved = JSON.parse(localStorage.getItem('stCourseData')),
			user = saved.user.data

        this.state = {
			complete: false,
			checkout: false,
			init: false,
			step: 0,
			option: false,
			loc: false,
			shipping: false,
			doTrial: false,
			coupon: {
				id: null,
				msg: '',
				val: 0
			},
			plan: localStorage.getItem('_stT-signup'),
			signature: btoa(navigator.userAgent+'|'+navigator.platform+'|'+navigator.product).replace(/=/g,''),
			...user
		}

		this.nextStep = this.nextStep.bind(this)
		this.toggleCheckout = this.toggleCheckout.bind(this)
		this.toggleTrial = this.toggleTrial.bind(this)
		this.shipChanged = this.shipChanged.bind(this)
		this.checkCoupon = this.checkCoupon.bind(this)
	}
	
	componentDidMount() {
		let obj = {init: true}

		if (this.state.plan !== 'undefined') Object.assign(obj,{
			step: 1,
			plan: _st.plans[this.state.plan]
		})
		
		this.setState(obj)
		_st.bodyClass = 'onboarding'
	}

	componentDidUpdate(prevProps,prevState) {
		let el = document.getElementById("step"+this.state.step),
			opt = navigator.vendor.includes('Apple') ? true : {behavior: 'smooth'}

		if (el !== null) el.scrollIntoView(opt)
	}

	shipChanged() {
		this.setState({
			step: 2,
			loc: false
		})
	}

	toggleCheckout() {
		this.setState(state => {
			return {checkout: !state.checkout}
		})
	}

	toggleTrial(tr=false) {
		this.setState({doTrial: tr})
	}

	nextStep(data={}) {
		this.setState(Object.assign({},data))
	}

	async checkCoupon(e) {
		e.preventDefault()

		let val = document.getElementById('coupon').value,
			obj = {
				id: null,
				msg: '',
				val: 0
			},
			{ price } = this.state.option

			if (val) {
				await _st.http.get('/signup/check?coupon='+val+'&sig='+this.state.signature, (d) => {

					if (d.code === 'signupError') {
						Object.assign(obj,{msg: d.message})
						return false
					}
	
					Object.assign(obj,{
						id: d.update.id,
						val: d.update.amount_off || price/d.update.percent_off
					})
				})
			}
	
			this.setState({coupon: obj}, () => console.log(this.state.coupon))
	}

    render() {
		let {init, firstname, plan, option, shipping} = this.state,
			{refreshData} = this.props

		if (!init) return null
		let plans = _st.plans

        return (
			<main id={'__'+_st.randKey()} className="stOnboardingWindow">
				<section id="step0" className="step">
					<div className="stOnboardBanner">
						<TextureImg/>
					</div>
					<div className="stStepContent">
						<div>
							<h3>Welcome{firstname ? ', '+firstname : ''}! Let's get started.</h3>
							<div className="stOnboardingPlans">
								<div className="ctaColumn"><span>Choose which course you'd like:</span></div>
								{['sat','act','combo'].map((val)=> {

									let active = (typeof plan !== 'undefined' && plan.value === val) ? 'active' : null,
										label = val === 'combo' ? 'both' : val
									return (
										<div className="stOnboardingPlan" onClick={(e) => {
											this.nextStep({
												step: 1,
												loc: false,
												option: false,
												plan: plans[val]
											})
											e.preventDefault()
										}}>
											<button className={['planInner',val,active].join(' ')}>
												<span>{label}</span>
											</button>
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</section>
				{this.state.plan ? <PlnOptions option={option} plan={plan} nextStep={this.nextStep} /> : null}
				{this.state.option ? <Shipping shipChanged={this.shipChanged} plan={plan} ship={shipping} nextStep={this.nextStep} /> : null}
				{this.state.loc ? <Finalize {...this.state} checkCoupon={this.checkCoupon} toggleTrial={this.toggleTrial} toggleCheckout={this.toggleCheckout} refreshData={refreshData} nextStep={this.nextStep} /> : null}
			</main>
        )
    }
}