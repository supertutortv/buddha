import React from 'react'

export default class Playlist extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            obj: this.props.obj
        }
    }

    componentDidMount() {}

    render() {
        const { loc, hist, match } = this.props

        console.log(loc)
        const sbStyle = {
            backgroundColor: this.state.obj.color
        }
        return (
            <section className="stPlaylistRoot">
                <div className="stPlaylistInner">
                    <div className="stPlaylistColA">
                        <figure className="stVideoStage">
                            <header className="stVideoHeader"></header>
                            <div className="stVideoContainer">
                                <div className="stVideoPlayer"></div>
                            </div>
                            <figcaption className="stVideoCaption"></figcaption>
                        </figure>
                    </div>
                    <div className="stPlaylistColB">
                        <section className="stPlaylistSidebar" style={sbStyle}>
                            <div className="stPlaylistSidebarInner">
                                {JSON.stringify(this.props.obj)}
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        )
    }
}