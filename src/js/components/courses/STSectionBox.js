import React from 'react'
import {Switch,Route,Redirect,Link} from 'react-router-dom'

const STSectionBox = ({slug, description, icon = 'atom', title, color}) =>
    <Link to={slug}>
        <section className="stSectionBoxWrap">
            <div className="stSectionBox">
                <div className="stSectionBoxInner" style={{border:'3px solid '+color}}>
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
    </Link>

export default STSectionBox