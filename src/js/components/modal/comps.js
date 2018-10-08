import React from 'react'

const Downloads = ({data}) => {
    return (
        <div className="stModalDownloads">
            <h1>Downloads</h1>
            <div className="stModalDownloadsContainer">
                {data.map(x => {
                    if (x.length > 0) return (
                        <section className="stDownloadSection">
                            <div className="stDownloadLinks">
                                {x.map(f => {
                                    let emp = (f.file === 0),
                                        path = emp || f.file.split('/'),
                                        href = emp ? null : 'https://api.supertutortv.com/course-dl.php?test='+path[0]+'&section='+path[1]+'&res='+path[2]+'&hash='+f.hash
                                    return (
                                        <figure className={"stDownloadLink"+(emp ? ' disabled' : '')} onClick={(e) => {
                                            if (emp)
                                                return e.preventDefault()
                                            else
                                                window.location = href
                                        }}>
                                            <img src={f.thumb}/>
                                            <figcaption>{f.name}</figcaption>
                                        </figure>
                                    )
                                })}
                            </div>
                        </section>
                    )
                })}
            </div>
        </div>
    )
}

const Practice = () => <div>Practice</div>

export { Downloads, Practice }