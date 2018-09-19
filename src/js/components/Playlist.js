import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Switch, Route, Redirect, Link } from 'react-router-dom'

const PlSidebar = ({collection}) => {
    let len = Object.keys(collection).length,
        tabs = [],
        panels = []

    if ('tips' in collection) {
        var { tips, ...collection } = collection
        tabs.push(<Tab>{tips.name}</Tab>)
        panels.push(<TabPanel>{JSON.stringify(tips.videos)}</TabPanel>)
    }

    for ( var coll in collection ) {
        tabs.push(<Tab>{collection[coll].name}</Tab>)
        panels.push(<TabPanel>{JSON.stringify(collection[coll].videos)}</TabPanel>)
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

        if (typeof vid.id === 'undefined') throw true
        
        return (
            <section className="stPlaylistRoot">
                <div className="stPlaylistInner">
                    <div className="stPlaylistColA">
                        <figure className="stVideoStage">
                            <header className="stVideoHeader"></header>
                            <div className="stVideoContainer">
                                <div className="stVideoPlayer">{JSON.stringify(vid)}</div>
                            </div>
                            <figcaption className="stVideoCaption">
                                <div className="stVideoTitle">
                                    <h1>{obj.name ? obj.name+' - ' : ''}<span>{vid.name || ''}</span></h1>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="stPlaylistColB" style={sbStyle}>
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