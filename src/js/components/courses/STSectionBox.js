import React from 'react'
import {Switch,Route,Redirect,Link} from 'react-router-dom'

const STSectionBox = ({hist, slug, description, icon = 'atom', title, color}) =>
    <section className="stSectionBoxWrap">
        <div className="stSectionBox">
            <div className="stSectionBoxInner" style={{border:'3px solid '+color}} onClick={(e) => {
                hist.push(slug)
            }}>
                <div className="stSectionBoxContainer">
                    <div className="boxHeader" style={{backgroundColor:color}}><i className={"brainy-"+icon}></i></div>
                    <div className="boxText">
                        <div className="boxTitle">{title}</div>
                        <div className="boxDesc">{description}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

export default STSectionBox