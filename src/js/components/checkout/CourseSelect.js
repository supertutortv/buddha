import React from 'react'

export default class CourseSelect extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            active: props.plan || 'act',
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
            <form className={randGen} action="/checkout" onSubmit={ಠ_ಠ}>
                <fieldset>
                    <h3>Choose your course:</h3>
                    <div className="st-crsGrp">
                        {Object.keys(plans).map((pl) => {
                                let pln = plans[pl],
                                    selected = this.state.active === pl ? 'selected' : ''
                                return (
                                    <button name="item|value" className={selected} value={pln.value} onClick={this.setActive}>{pln.label}</button>
                                )
                            })
                        }
                    </div>
                    <h3>Choose your course length:</h3>
                    <div className={"st-crsGrp ln "+randGen}>
                        {plans[this.state.active].options.map((pl,i,arr) => {
                            let selected = arr.length === 1 || this.state.option === i ? 'selected' : ''
                            return (
                                <button name="item|option" onClick={(e) => this.setOption(e,i)} className={selected} value={pl.length}>{pl.length+" months - $"+Math.trunc(pl.price/100)}</button>
                            )
                        })}
                    </div>
                </fieldset>
                {children}
            </form>
        )
    }
}