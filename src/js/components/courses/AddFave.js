import React from 'react'

export default class AddFave extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            faved: null
        }
        this.inPL = null

        this.isInPlaylist = this.isInPlaylist.bind(this)
    }

    isInPlaylist() {
        const { playlist, vid } = this.props
        return playlist.some((obj) => {
            return obj.vidid === vid.id && (this.inPL = obj)
        })
    }

    componentDidMount() {}

    render() {
        const { deleteUdata, updateUdata, vid, test, loc, playlist } = this.props
        const faved = this.isInPlaylist()

        if (faved || this.state.faved) {
            this.state.faved = false
            return (
                <a className="stPlaylistAction faved" title="Added to Study List" onClick={(e) => 
                    this.setState({faved: false}, () => deleteUdata('playlist',vid,this.inPL))
                }>
                    <i class="fas fa-heart"></i>
                </a>
            )
        } else {
            return (
                <a className="stPlaylistAction" title="Add to My Study List" onClick={(e) => 
                    this.setState({faved: true}, () => updateUdata('playlist',vid,test,loc))
                }>
                    <i class="far fa-heart"></i>
                </a>
            )
        }
    }
}