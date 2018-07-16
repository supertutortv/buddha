import React from 'react'
import {Route, Link} from 'react-router-dom'

// Generates links and thumbnails for an array of videos; used in the
// right sidebar of the Courses component
function Videos(props) {
  let key = 0
  let videos = []
  const vids = props.vids
  for (let vid in vids) {
    let video = vids[vid]
    let link
    if ('data' in video) {
      link = video.data.url
      video = this.getResourceByUrl(video.data.url)
    }
    else {
      link = props.link + '/' + video.slug
    }
    let thumb = this.state.thumb.replace('||ID||', video.thumb)
    let ref = this.cleanup(link.slice(1)).concat(' >')
    videos.push(
      <Route path={link} key={key} className="st-video-card">
        <Link to={link} onClick={() => this.setStage({stage: video.id})}>
          <div className="st-video-card">
            <div>
                <img className="st-thumb" src={thumb}/>
            </div>
            <span className="st-video-card-title"> {video.name}</span>
          </div>
          <div path={link} />
        </Link>
      </Route>
      )
      key++
    }
  return videos
}

export {Videos}
