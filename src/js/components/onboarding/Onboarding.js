import React from 'react'
import TextureImg from './texture'

export default class Onboarding extends React.Component{
    constructor(props) {
		super(props)
		
		let saved = JSON.parse(localStorage.getItem('_stT-signup') || {})

        this.state = {
            active: props.plan || '',
			option: false,
			...saved
        }

        this.setActive = this.setActive.bind(this)
        this.setOption = this.setOption.bind(this)
	}
	
	componentDidMount() {
		_st.bodyClass = 'onboarding'
	}

    setActive(e) {
        e.preventDefault()
        this.setState({
            active: e.target.value,
            option: false
        })
    }

    setOption(e,op) {
        e.preventDefault()
        this.setState({
            option: op
        })
    }

    render() {
        let plans = _st.plans,
			{ಠ_ಠ,children} = this.props,
			{firstname} = this.state
			
        return (
			<main id={'__'+_st.randKey()} className="stOnboardingWindow">
				<section id="step1" className="step">
					<div className="stOnboardBanner">
						<TextureImg/>
					</div>
					<div className="stStepContent">
						<div>
							<h3>Welcome{firstname ? ', '+firstname : ''}! Let's get started.</h3>
							<div className="stOnboardingPlans">
								<div className="stOnboardingPlan" data-value="sat" onClick={null}>
									<div className="planInner sat">
										<strong>SAT</strong>
										<i class="fas fa-plus"></i>
									</div>
								</div>
								<div className="stChoiceGap">OR</div>
								<div className="stOnboardingPlan" data-value="act" onClick={null}>
									<div className="planInner act">
										<strong>ACT</strong>
										<i class="fas fa-plus"></i>
									</div>
								</div>
								<div className="bothColumn">
									<button>I want both!</button>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
        )
    }
}