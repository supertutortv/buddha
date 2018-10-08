import React from 'react'

const Downloads = ({data}) => {
    return (
        <div className="stModalDownloads">
            <h1>Downloads</h1>
            <div className="stModalDownloadsContainer">
                {data.map(x => {
                    if (x.files.length > 0) return (
                        <section className="stDownloadSection">
                            <h2>{x.name}</h2>
                            <div className="stDonwloadLinks">
                                {x.files.map(f => {
                                    let emp = (f.file === 0)
                                    return (
                                        <a href={emp || f.file} className={"stDownloadLink"+(emp ? ' disabled' : '')} onClick={(e) => {if (emp) e.preventDefault()}}>{f.name}</a>
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