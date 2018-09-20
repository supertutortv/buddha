import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Switch, Route, Redirect, Link } from 'react-router-dom'

const PlSidebar = ({collection}) => {
    let tabs = [],
        panels = []

    if ('tips' in collection) {
        var { tips, ...collection } = collection,
            tipvids = []
        for (var tipvid in tips.videos) {
            tipvids.push(<Link to={'#'+tipvid}>{tips.videos[tipvid].name}</Link>)
        }
        tabs.push(<Tab>{tips.name}</Tab>)
        panels.push(<TabPanel>{tipvids}</TabPanel>)
    }

    for ( var coll in collection ) {
        let videos = []

        for ( var vid in collection[coll].videos) {
            let vidObj = collection[coll].videos[vid]
            videos.push(
                <article className="stCollectionItem">
                    <Link className="stCollectionItemLink" to={'#'+vid}>
                        <figure className="stCollectionItemInner">
                            <div className="stLinkImageWrapper z-depth-1">
                                <picture>
                                    <img src={"https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F"+vidObj.thumb+"_295x166.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"} />
                                </picture>
                            </div>
                            <figcaption>
                                <h3 className="stCollectionItemTitle">{vidObj.name}</h3>
                            </figcaption>
                        </figure>
                    </Link>
                </article>
            )
        }
        tabs.push(<Tab>{collection[coll].name}</Tab>)
        panels.push(<TabPanel>{videos}</TabPanel>)
    }
    
    return (
        <Tabs defaultIndex={0} onSelect={index => console.log(index)}>
            <TabList>
                {tabs}
            </TabList>
            {panels}
        </Tabs>
    )
}

export default class Playlist extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeVid: ''
        }
    }

    componentDidMount() {}

    render() {
        const { loc, hist, match, obj } = this.props

        if (!loc.hash) {
            hist.replace('#introduction')
            return null
        }

        const sbStyle = {
            backgroundColor: obj.color
        }

        const hash = loc.hash.replace(/^\#/,'')

        var vid = {}
        
        Object.keys(obj.collection).some((val) => {
            if (hash in obj.collection[val].videos) {
                vid = obj.collection[val].videos[hash]
                return true
            }
            return false
        })
        console.log(match)
        return (
            <section className="stPlaylistRoot">
                <div className="stPlaylistInner">
                    <div className="stPlaylistColA">
                        <figure className="stVideoStage">
                            <header className="stVideoHeader">{<Link to={'/'+match.params.courses}>{'< Back to course'}</Link>}</header>
                            <div className="stVideoContainer">
                                <div className="stVideoPlayer">
                                    <article className="stVideoPlayerContainer">
                                    {vid.id === 0 ? 
                                        <React.Fragment>
                                            <img src={"https://i.vimeocdn.com/video/"+vid.thumb+"_295x166.jpg?r=pad"} />
                                            <div className="stNoAccessOverlay"><h2>This video is not available during the free trial period</h2></div>
                                        </React.Fragment> : 
                                        <iframe src={'https://player.vimeo.com/video/||ID||?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;autoplay=1'.replace('||ID||', vid.id || '0')} frameBorder="0" webkitAllowFullscreen="" mozAllowFullscreen="" allowFullscreen=""></iframe>
                                    }
                                    </article>
                                </div>
                            </div>
                            <figcaption className="stVideoCaption">
                                <div className="stVideoCaptionWrapper">
                                    <div className="stVideoTitle">
                                        <h1>{obj.name ? obj.name+' > ' : ''}<span>{vid.name || 'Not Found'}</span></h1>
                                    </div>
                                    <div className="stVideoText">
                                        <span>{vid.text || ''}</span>
                                    </div>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="stPlaylistColB">
                        <section className="stPlaylistSidebar">
                            <div className="stPlaylistSidebarInner">
                                <PlSidebar collection={obj.collection} />
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        )
    }
}