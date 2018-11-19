import React from 'react'
import FAIco from '../FAIco'

const Downloads = ({refDls,reportDl,color,data}) => {
    console.log(data)
    return (
        <div className="stModalDownloads">
            <section className="stDownloadLinks">
                {data.map(f => {
                    let emp = (f.file === 0),
                        path = emp || f.file.split('/'),
                        href = emp ? null : 'https://api.supertutortv.com/course-dl.php?test='+path[0]+'&section='+path[1]+'&res='+path[2]+'&hash='+f.hash
                    return (
                        <figure 
                            className={"stDownloadLink"+(emp ? ' disabled' : '')} 
                            onClick={(e) => {
                                if (emp)
                                    return e.preventDefault()
                                else
                                    _st.udata.update('downloads',f,(d) => {
                                        reportDl(d.data.vidid)
                                    })
                                    window.location = href
                        }}>
                            <div className="inner">
                                <img src={f.thumb}/>
                                <figcaption>
                                    <span className="stDownloadName">
                                        <span>{f.name}</span>
                                        <span className="dld">{(refDls.indexOf(f.hash) > -1) ? <FAIco icon="check" /> : null}</span>
                                    </span>
                                    <span className="stDownloadSize">{f.size}</span>
                                </figcaption>
                            </div>
                        </figure>
                    )
                })}
            </section>
        </div>
    )
}

const Practice = () => <div>Practice</div>

export { Downloads, Practice }