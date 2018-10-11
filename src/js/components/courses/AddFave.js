import React from 'react'
import FAIco from '../FAIco'

export default class AddFave extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            faved: null
        }

        this.isInPlaylist = this.isInPlaylist.bind(this)
    }

    isInPlaylist() {
        const { playlist, vid } = this.props
        return playlist.hasOwnProperty(vid.id)
    }

    componentDidMount() {
        this.setState({faved: this.isInPlaylist()})
    }

    render() {
        if (this.state.faved === null) return null

        const { updateUdata, vid, test, loc } = this.props

        if (this.state.faved || this.isInPlaylist()) {
            return (
                <a className="stPlaylistAction faved" title="Added to Study List">
                    <FAIco icon={'heart'}/>
                </a>
            )
        } else {
            return (
                <a className="stPlaylistAction" title="Add to My Study List" onClick={(e) => 
                    this.setState({faved: true}, () => updateUdata('playlist',vid,test,loc))
                }>
                    <FAIco icon={['far','heart']}/>
                </a>
            )
        }
    }
}