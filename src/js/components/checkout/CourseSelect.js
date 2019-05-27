import React from 'react'

export default class CourseSelect extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            active: props.plan
        }

        this.setActive = this.setActive.bind(this)
    }

    setActive(e) {
        e.preventDefault()
        let plans = _st.plans
        console.log(plans[e.target.value])
    }

    render() {
        let plans = _st.plans
        return (
            <fieldset>
                <h3>Choose your course:</h3>
                <div className="st-crsGrp">
                    {Object.keys(plans).map((pl) => {
                            let pln = plans[pl],
                                selected = this.state.active === pl ? 'selected' : ''
                            return (
                                <button className={selected} value={pln.value} onClick={this.setActive}>{pln.label}</button>
                            )
                        })
                    }
                </div>
            </fieldset>
        )
    }
}