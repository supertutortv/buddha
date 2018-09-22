import React from 'react'

const STSectionBox = ({desc = '', icon = 'atom',title = 'boosh',color = '#109fda'}) =>
    <section className="stSectionBoxWrap">
        <div className="stSectionBox">
            <div className="stSectionBoxInner z-depth-3" style={{border:'3px solid '+color}}>
                <div className="stSectionBoxContainer">
                    <div>
                        <div className="boxHeader" style={{backgroundColor:color}}><i className={"brainy-"+icon}></i></div>
                        <div className="boxTitle">{title}</div>
                        <div className="boxDesc">Section description</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

export default STSectionBox