import React from 'react'
import TextureImg from './texture'
import CountryDD from '../checkout/pieces/CountryDD'

const PlnOptions = ({nextStep, plan}) => {
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
							return (
								<div className="stOnboardingOption">
									<button className="optionInner" onClick={(e) => {
										e.preventDefault()
										nextStep({step: 2, option: opt})
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

const Shipping = ({nextStep}) => {
	return (
		<section id="step2" className="step">
			<div className="stStepContent">
				<label for="locSelect">Select your country</label><br/>
				<CountryDD className="locSelect" name="locSelect" onChange={(e) => console.log(e.target.value)} required />
			</div>
		</section>
	)
}

export default class Onboarding extends React.Component{
    constructor(props) {
		super(props)
		
		let saved = JSON.parse(localStorage.getItem('_stT-signup') || {})

        this.state = {
			init: false,
			step: 0,
			option: false,
			loc: false,
			...saved
        }

        this.nextStep = this.nextStep.bind(this)
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
		let el = document.getElementById("step"+this.state.step)

		if (el !== null) el.scrollIntoView({
			behavior: 'smooth'
		})
	}

	nextStep(data={}) {
		this.setState(Object.assign({},data))
	}

    render() {
		let {init, firstname} = this.state
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
								<div className="stOnboardingPlan" onClick={(e) => {
									this.nextStep({step: 1, option: false, plan: plans['sat']})
									e.preventDefault()
								}}>
									<button className="planInner sat">
										<span>SAT</span>
									</button>
								</div>
								<div className="stOnboardingPlan" onClick={(e) => {
									this.nextStep({step: 1, option: false, plan: plans['act']})
									e.preventDefault()
								}}>
									<button className="planInner act">
										<span>ACT</span>
									</button>
								</div>
								<div className="stOnboardingPlan" onClick={(e) => {
									this.nextStep({step: 1, option: false, plan: plans['combo']})
									e.preventDefault()
								}}>
									<button className="planInner combo">
										<span>Both</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>
				{this.state.plan ? <PlnOptions plan={this.state.plan} nextStep={this.nextStep} /> : null}
				{this.state.option ? <Shipping nextStep={this.nextStep} /> : null}
				{this.state.loc ? '' : null}
			</main>
        )
    }
}