import React from 'react'

export default class CourseSelect extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            active: props.plan
        }
    }

    setActive() {

    }

    render() {
        console.log(_st.plans)
        return (
            <fieldset>
                <h3>Choose your course:</h3>
                <div className="st-crsgrp btns" onClick={(e) => {
                    e.preventDefault()
                    if (e.target.classList.contains('selected') || e.target.hasAttribute('disabled')) return false
    
                    let buttons = e.currentTarget.querySelectorAll('button')
    
                    for (let i=0; i < buttons.length; i++) {
                        buttons[i].classList.remove('selected')
                    }
    
                    e.target.classList.add('selected')
                }}>
                    <button value="sat" className="selected">SAT</button>
                    <button value="act">ACT</button>
                    <button value="combo">Both</button>
                </div>
            </fieldset>
        )
    }
}