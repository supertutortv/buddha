import React from 'react'

const Buttons = ({count, step, steps}) =>
    <div className="st-btnGroup">
        {count === steps ?
            <button type="submit" className="stAccountButton btn" disabled>Get Started!</button> :
            <React.Fragment>
                {step === 0 ? null : <button type="submit" className="stAccountButton btn">← <span>Previous Step</span></button>}
                <button type="submit" className="stAccountButton btn"><span style={{marginRight: '1em'}}>Next Step</span> →</button>
            </React.Fragment>
        }
    </div>

export default Buttons