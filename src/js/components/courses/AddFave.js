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

    componentDidMount() {}

    render() {
        const { deleteUdata, updateUdata, vid, test, loc, playlist } = this.props
        const faved = this.isInPlaylist()

        if (faved || this.state.faved) {
            this.state.faved = false
            return (
                <a className="stPlaylistAction faved" title="Added to Study List" onClick={(e) => 
                    this.setState({faved: false}, () => deleteUdata('playlist',vid,playlist[vid.id]))
                }>
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