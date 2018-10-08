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
                        </section>
                    )
                })}
            </div>
        </div>
    )
}

const Practice = () => <div>Practice</div>

export { Downloads, Practice }