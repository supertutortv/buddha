import React from 'react'
import PropTypes from 'prop-types'
import Player from '@vimeo/player'
import { Switch, Route, Redirect, Link } from 'react-router-dom'

const events = {
    'play': (e) => false,
    'ended': (e, { getNextVid }) => getNextVid()
}

class VidPlayer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: ''
        }

        this.initial = {
            id: this.props.video,
            width: 1920,
            height: 1080,
            autopause: this.props.autopause,
            autoplay: this.props.autoplay,
            byline: this.props.showByline,
            portrait: this.props.showPortrait,
            title: this.props.showTitle,
            muted: this.props.muted,
            background: this.props.background,
            playsinline: this.props.playsInline
          }

        this.refContainer = this.refContainer.bind(this)
        this.setTitle = this.setTitle.bind(this)
    }

    componentDidMount() {
        this.createPlayer()
    }

    componentWillUnmount() {
        this.player.destroy()
    }

    componentDidUpdate(prev) {
        console.log(prev)
        const changes = Object.keys(this.props).filter(name => this.props[name] !== prev[name])
        this.updateProps(changes)
    }

    createPlayer() {
        this.player = new Player(this.container, this.initial)
        Object.keys(events).forEach((ev) => {
            this.player.on(ev, (event) => {
                events[ev](event, this.props)
            })
        })

        if (this.props.showTitle) this.player.getVideoTitle().then((t) => this.setTitle(t))
    }

    setTitle(title) {
        this.setState({title: title})
    }

    updateProps(names) {
        const { player } = this

        names.forEach((name) => {
            const value = this.props[name]

            switch (name) {
                case 'autoplay':
                    player.destroy().then((u) => {
                        this.createPlayer()
                    }).catch(function(error) {
                        console.log(error)
                    })
                    break
                case 'video':
                    player.loadVideo(value)
                    player.getVideoTitle().then((t) => this.setTitle(t))
                    break
            }
        })
    }

    refContainer(container) {
        this.container = container
    }

    render() {
        return (
            <div className="stVimWrap">
                <div className="stVimRoot" ref={this.refContainer} />
                <div className="stVimTitle">{this.props.showTitle ? this.state.title : ''}</div>
            </div>
        )
    }
}

VidPlayer.defaultProps = {
    autopause: false,
    autoplay: true,
    showByline: false,
    showPortrait: false,
    showTitle: false,
    getTitle: false,
    muted: false,
    background: false,
    video: 0,
    playInline: true,
    nextVid: false
}

export default VidPlayer