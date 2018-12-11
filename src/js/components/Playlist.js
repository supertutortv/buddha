import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import VidPlayer from './VidPlayer'
import FAIco from './FAIco'
import AddFave from './courses/AddFave'

export default class Playlist extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            coll: 0,
            vid: 0,
            nextVid: '',
            updating: false
        }

        this.nextVid = this.nextVid.bind(this)
        this.updateUdata = this.updateUdata.bind(this)
        this.deleteUdata = this.deleteUdata.bind(this)
    }

    componentDidMount() {}

    componentWillUnmount() {}

    nextVid() {
        this.setState((state) => {return {vid: state.vid + 1}})
    }

    deleteUdata(patch,vid,dt) {
        if (this.state.updating === true) return false

        this.state.updating = true
        this.props.deleteUdata(dt,(d) => {
            switch(patch) {
                case 'playlist':
                    if (d.code === 'resourceDeleteFail') return false
                    this.props.playlist.some((obj,i,a) => d.data.id === obj.id && (a.splice(i)))
                break
            }
            this.setState({updating: false})
        })
    }

    updateUdata(patch,vid,test,loc) {
        if (this.state.updating === true) return false
        if (vid.id === 0) return false

        this.state.updating = true
        _st.http.put('/courses/data/'+patch,Object.assign(vid,{test:test,path:loc.pathname}),(d) => {
            switch (patch) {
                case 'playlist':
                    if (d.code === 'resourceExists') return false
                    this.props.setPlaylist(this.props.match.params.courses,d.data)
                    break
                case 'history':
                    this.props.addHistory(this.props.match.params.courses,d.data)
                    break
            }
            this.setState({updating: false})
        })
    }

    render() {
        const { watchHist, playlist, test, loc, hist, match, obj, refDls, dls, modalActive } = this.props

        const colls = Object.keys(obj.collection),
            activeColl = obj.collection[colls[this.state.coll]],
            vids = Object.keys(activeColl.videos),
            vid = activeColl.videos[vids[this.state.vid]],
            theBook = activeColl.parent || '',
            panels = ''

        const sbStyle = {
            backgroundColor: obj.color
        }

        const bckStyle = {
            color: obj.color
        }

        return (
            <section className="stPlaylistRoot stComponentFade">
                <div className="stPlaylistInner">
                    <div className="stPlaylistColA">
                        <figure className="stVideoStage">
                            <header className="stVideoHeader">
                                <Link to={'/'+match.params.courses}>{'< Back to course'}</Link>
                                <div className="stPlaylistActions">
                                    <a className={"stPlaylistAction"+((dls.length === 0) ? ' disabled' : '')} title={(dls.length === 0) ? 'No downloads available' : 'Downloads'} onClick={(e) => {
                                        if (dls.length === 0) return e.preventDefault()
                                        modalActive({
                                            open: true,
                                            action: 'Downloads',
                                            mData: dls,
                                            color: obj.color,
                                            refr: refDls,
                                            test: match.params.courses
                                        })
                                    }}><FAIco icon="cloud-download-alt"/></a>
                                    {vid.id === 0 ? '' : <AddFave deleteUdata={this.deleteUdata} updateUdata={this.updateUdata} vid={vid} test={test} loc={loc} playlist={playlist} />}
                                </div>
                            </header>
                            <div className="stVideoContainer">
                                <div className="stVideoPlayer">
                                    <article className="stVideoPlayerContainer">
                                    {vid.id === 0 ? 
                                        <React.Fragment>
                                            <img src={"https://i.vimeocdn.com/video/"+vid.thumb+"_295x166.jpg?r=pad"} />
                                            <div className="stNoAccessOverlay"><h2>This video is not available during the free trial period</h2></div>
                                        </React.Fragment> : 
                                        <VidPlayer getNextVid={this.nextVid} video={vid.id} />
                                    }
                                    </article>
                                </div>
                            </div>
                            <figcaption className="stVideoCaption">
                                <div className="stVideoCaptionWrapper">
                                    <div className="stVideoTitle">
                                        <h1><span>{theBook ? theBook+' > ' : ''}</span>{obj.name ? obj.name+' > ' : ''}<span>{vid.name || 'Not Found'}</span></h1>
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
                                {/* <PlSidebar watchHist={watchHist} updateUdata={this.updateUdata} vid={vid} test={test} loc={loc} setNextVid={this.setNextVid} sbStyle={sbStyle} hash={hash} activeColl={activeColl} collection={obj.collection} /> */}
                                <Tabs className="stSidebarWrapper" selectedIndex={this.state.coll} onSelect={ind => this.setState({ vid: 0, coll: ind })}>
                                    <div className="stCollectionTabsWrapper">
                                        <TabList className='stCollectionTabs'>
                                            {colls.map((col,i) => <Tab className='stCollectionTab'>{obj.collection[col].name}</Tab>)}
                                        </TabList>
                                    </div>
                                    {colls.map((col,i) => <TabPanel className='stCollectionTabPanel'>{
                                            Object.keys(obj.collection[col].videos).map((v,ii) => {
                                                let vidObj = obj.collection[col].videos[v],
                                                    stylOb = (ii === this.state.vid) ? {style: sbStyle} : {},
                                                    activeClass = ii === this.state.vid ? ' active' : '',
                                                    watchd = watchHist.indexOf(vidObj.id) > -1 ? <FAIco title="watched" icon="clock"/> : ''
                                                return (
                                                    <article className={"stCollectionItem"+activeClass} {...stylOb}>
                                                        <div className="stCollectionItemLink" onClick={() => this.setState({vid: ii},() => this.updateUdata('history',vidObj,test,loc))}>
                                                            <figure className="stCollectionItemInner">
                                                                <div className="stLinkImageWrapper z-depth-1">
                                                                    <picture>
                                                                        <img src={"https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F"+vidObj.thumb+"_295x166.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"} />
                                                                    </picture>
                                                                </div>
                                                                <figcaption>
                                                                    <h3 className="stCollectionItemTitle">{vidObj.name}</h3>
                                                                </figcaption>
                                                                <div>{watchd}</div>
                                                            </figure>
                                                        </div>
                                                        
                                                    </article>
                                                )
                                            })
                                        }</TabPanel>)}
                                </Tabs>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        )
    }
}