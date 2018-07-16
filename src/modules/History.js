import React from 'react'
import {Link} from 'react-router-dom'

// History component. Contains a grid of videos which is currently static
function History(props) {
  let vids = []
  let index = 0
  const history = this.state.user.history
  const thumbURL = this.state.thumb
  for (let item in history) {
    let url = history[item].data.url
    let vid = this.getResourceByUrl(url)
    let thumb = thumbURL.replace('||ID||', vid.thumb)
    let click
    if (vid.id) {
      click = () => this.updateStage(String(vid.id))
    }
    vids.push(
      <div key={index} className="video-in-grid">
        <Link to={url} onClick={click}>
          <div >
            <div>
                <img className="grid-thumb" src={thumb} className="z-depth-3"/>
            </div>
            <span className="video-grid-title"> {this.cleanup(url.slice(1))} </span>
          </div>
        </Link>
      </div>
    )
    index++
  }
  return(
    <div className="video-grid">
      {vids}
    </div>
  )
}

export {History}
