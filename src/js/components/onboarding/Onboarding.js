import React from 'react'
import TextureImg from './texture'

const PlnOptions = (...props) => {
	console.log(props)

	return null
}

export default class Onboarding extends React.Component{
    constructor(props) {
		super(props)
		
		let saved = JSON.parse(localStorage.getItem('_stT-signup') || {})

        this.state = {
			init: false,
			step: 0,
			option: false,
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
				{this.state.plan !== 'undefined' ? <PlnOptions {...this.state.plan} nextStep={this.nextStep} /> : null}
				{this.state.option === false ? null : null}
			</main>
        )
    }
}