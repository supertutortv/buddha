import React from 'react'

export default class Onboarding extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            active: props.plan || '',
            option: false
        }

        this.setActive = this.setActive.bind(this)
        this.setOption = this.setOption.bind(this)
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
            randGen = _st.randKey()
        return (
			<section className="stCheckoutWindow">
				<h2>Welcome, [name]! Choose your course.</h2>
				{Object.keys(plans).map((pl) => {
					let pln = plans[pl],
						selected = this.state.active === pl ? 'selected' : ''
					return (
						<button name="item|value" className={selected} value={pln.value} onClick={this.setActive}>{pln.label}</button>
					)
				})}
			</section>
        )
    }
}