import React from 'react'

const STSectionBox = ({icon = 'atom',title = 'boosh',color = '#109fda'}) =>
    <section className="stSectionBoxWrap">
        <div className="stSectionBox">
            <div className="stSectionBoxInner z-depth-3" style={{backgroundColor:color}}>
                <div className="stSectionBoxContainer">
                    <div>
                        <div><i className={"brainy-"+icon}></i></div>
                        <div>{title}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

export default STSectionBox