import React from 'react'
import {Route, Link} from 'react-router-dom'

// Generates links and thumbnails for an array of videos; used in the
// right sidebar of the Courses component
function Videos(props) {
  function duration(seconds) {
    let timeString = ''
    if (Math.floor(seconds/3600) > 0) {
      timeString += String(Math.floor(seconds/3600)) + 'h '
    }
    if (Math.floor(seconds/60) > 0) {
      timeString += String(Math.floor(seconds/60)) + 'm '
    }
    timeString += String(seconds % 60) + 's '
    return timeString
  }
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
    const timeLabel = duration(video.time)
    videos.push(
      <Route path={link} key={key} className="st-video-card">
        <Link to={link} onClick={() => this.setState({stage: video.id})}>
          <div className={window.location.pathname == link ? 'st-video-card-highlight' : 'st-video-card'} >
            <img className="st-video-card-thumb" src={thumb}/>
            <span className="st-video-card-title">
              {video.name}
              <br />
              <span style={{fontStyle: 'italic'}}>
              {timeLabel}
              </span>
            </span>
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
