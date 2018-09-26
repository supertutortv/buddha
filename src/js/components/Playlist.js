import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import VidPlayer from './VidPlayer'

const PlSidebar = ({setNextVid, sbStyle, hash, activeColl, collection}) => {
    let ord = [],
        tabs = [],
        panels = [],
        ind = 0

    if ('tips' in collection) {
        var { tips, ...collection } = collection
        ord.push(['tips',tips])
    }

    for ( var coll in collection ) {
        ord.push([coll,collection[coll]])
    }

    ord.forEach((el,i) => {
        let name = el[0],
            obj = el[1],
            vids = [],
            nextVid = false

        if (name === activeColl) ind = i

        var ii = 1,
            keys = Object.keys(obj.videos)

        keys.forEach((vid) => {
            let vidObj = obj.videos[vid],
                stylOb = (vid === hash) ? {style: sbStyle} : {},
                activeClass = vid === hash ? ' active' : ''

            if (nextVid) setNextVid(vid)

            vids.push(
                <article className={"stCollectionItem"+activeClass} {...stylOb}>
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

            nextVid = (vid === hash)
            if (nextVid && ii === keys.length) setNextVid('')
            ii++
        })

        tabs.push(<Tab className='stCollectionTab'>{obj.name}</Tab>)
        panels.push(<TabPanel className='stCollectionTabPanel'>{vids}</TabPanel>)
    })

    return (
        <Tabs defaultIndex={ind} className="stSidebarWrapper">
            <div className="stCollectionTabsWrapper">
                <TabList className='stCollectionTabs'>
                    {tabs}
                </TabList>
            </div>
            {panels}
        </Tabs>
    )

}

export default class Playlist extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            nextVid: ''
        }

        this.getNextVid = this.getNextVid.bind(this)
        this.setNextVid = this.setNextVid.bind(this)
    }

    componentDidMount() {}

    componentWillUnmount() {}

    getNextVid() {
        if (this.state.nextVid) this.props.hist.push('#'+this.state.nextVid)
    }

    setNextVid(vid = '') {
        this.state.nextVid = vid
    }

    render() {
        const { loc, hist, match, obj } = this.props

        if (!loc.hash) {
            hist.replace('#introduction')
            return null
        }

        const sbStyle = {
            backgroundColor: obj.color
        }

        const bckStyle = {
            color: obj.color
        }

        const hash = loc.hash.replace(/^\#/,'')

        var vid = {
            id: null
        },
            activeColl = ''
        
        Object.keys(obj.collection).some((val) => {
            if (hash in obj.collection[val].videos) {
                vid = obj.collection[val].videos[hash]
                activeColl = val
                return true
            }
            return false
        })

        return (
            <section className="stPlaylistRoot">
                <div className="stPlaylistInner">
                    <div className="stPlaylistColA">
                        <figure className="stVideoStage">
                            <header className="stVideoHeader">{<Link style={bckStyle} to={'/'+match.params.courses}>{'< Back to course'}</Link>}</header>
                            <div className="stVideoContainer">
                                <div className="stVideoPlayer">
                                    <article className="stVideoPlayerContainer">
                                    {vid.id === 0 ? 
                                        <React.Fragment>
                                            <img src={"https://i.vimeocdn.com/video/"+vid.thumb+"_295x166.jpg?r=pad"} />
                                            <div className="stNoAccessOverlay"><h2>This video is not available during the free trial period</h2></div>
                                        </React.Fragment> : 
                                        <VidPlayer getNextVid={this.getNextVid} video={vid.id} />
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
                                <PlSidebar setNextVid={this.setNextVid} sbStyle={sbStyle} hash={hash} activeColl={activeColl} collection={obj.collection} />
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        )
    }
}