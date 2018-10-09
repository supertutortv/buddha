import React from 'react'
import FAIco from '../FAIco'

const Downloads = ({color,data}) => {
    return (
        <div className="stModalDownloads">
            <section className="stDownloadLinks">
                {data.map(f => {
                    let emp = (f.file === 0),
                        path = emp || f.file.split('/'),
                        href = emp ? null : 'https://api.supertutortv.com/course-dl.php?test='+path[0]+'&section='+path[1]+'&res='+path[2]+'&hash='+f.hash
                    return (
                        <figure 
                            onMouseOver={(e) => e.target.style = {'background-color': 'rgba('+color+',.25)'}} 
                            onMouseOut={(e) => e.target.style = {'background-color': 'transparent'}} 
                            className={"stDownloadLink"+(emp ? ' disabled' : '')} 
                            onClick={(e) => {
                                if (emp)
                                    return e.preventDefault()
                                else
                                    window.location = href
                        }}>
                            <img src={f.thumb}/>
                            <figcaption>
                                <span className="stDownloadName"><span>{f.name}</span><span className="dld"><FAIco icon="check" /></span></span>
                                <span className="stDownloadSize">{f.size}</span>
                            </figcaption>
                        </figure>
                    )
                })}
            </section>
        </div>
    )
}

const Practice = () => <div>Practice</div>

export { Downloads, Practice }