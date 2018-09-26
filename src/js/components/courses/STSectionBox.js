import React from 'react'
import {Switch,Route,Redirect,Link} from 'react-router-dom'
import FAIco from '../FAIco'

const STSectionBox = ({hist, path, description, icon, name, color}) =>
    <section className="stSectionBoxWrap">
        <div className="stSectionBox">
            <div className="stSectionBoxInner" style={{border:'1px solid '+color}} onClick={(e) => {
                hist.push(path)
            }}>
                <div className="stSectionBoxContainer">
                    <div className="boxHeader" style={{backgroundColor:color}}></div>
                    <div className="boxText">
                        <div className="boxIcon"><FAIco icon={icon} /></div>
                        <div className="boxTitle">{name}</div>
                        <div className="boxDesc">{description}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

export default STSectionBox