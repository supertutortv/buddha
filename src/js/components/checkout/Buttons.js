import React from 'react'

const Buttons = ({back, count, step, steps}) =>
    <div className="st-btnGroup">
        {count === steps ?
            <button type="submit" className="stAccountButton btn" disabled>Get Started!</button> :
            <React.Fragment>
                {step === 0 ? null : <button onClick={back} type="submit" className="stAccountButton btn">← <span style={{marginLeft: '.5em'}}>Previous Step</span></button>}
                <button type="submit" className="stAccountButton btn"><span style={{marginRight: '.5em'}}>Next Step</span>→</button>
            </React.Fragment>
        }
    </div>

export default Buttons