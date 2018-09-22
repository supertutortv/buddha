import React from 'react'
import {Switch,Route,Redirect,Link} from 'react-router-dom'

const STSectionBox = ({hist, path, description, icon = 'atom', name, color}) =>
    <section className="stSectionBoxWrap">
        <div className="stSectionBox">
            <div className="stSectionBoxInner" style={{border:'3px solid '+color}} onClick={(e) => {
                hist.push(path)
            }}>
                <div className="stSectionBoxContainer">
                    <div className="boxHeader" style={{backgroundColor:color}}><i className={"brainy-"+icon}></i></div>
                    <div className="boxText">
                        <div className="boxTitle">{name}</div>
                        <div className="boxDesc">{description}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

export default STSectionBox