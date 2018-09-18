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
        return (
            <section className="stPlaylistRoot">
                <div className="stPlaylistInner">
                    <div className="stPlaylistColA">
                        <figure className="stVideoStage">
                            <header className="stVideoHeader"></header>
                            <figcaption className="stVideoCaption"></figcaption>
                        </figure>
                    </div>
                    <div className="stPlaylistColB">{JSON.stringify(this.props.obj)}</div>
                </div>
            </section>
        )
    }
}