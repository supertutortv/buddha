import React from 'react'
import {Icon} from 'react-materialize'
import {Link} from 'react-router-dom'
import ReactPlayer from 'react-player'

// The video stage component; generates an iframe based on this.state.stage
// and generates a label for the video as well as a bookmark button
function Stage(props) {
  try {
    const vid = this.getResourceByUrl(props.location)
    let label
    if (vid.data) {
      label = this.cleanup(props.location.split('/').filter(String).splice(1).join('/'))
    }
    else if (vid.name) {
      const location = props.location.split('/').filter(String).splice(1)
      location.pop()
      label = this.cleanup(location.join(' > ')) + ' > ' + vid.name
    }
    if (!label) {
      label = <br />
    }
    let frame
    let id
    if (vid.id) {
      id = vid.id
    }
    else if (vid.data && vid.data.intro) {
      id = vid.data.intro
    }
    else {
      id = vid.collection[Object.keys(vid.collection)[0]].id
    }
    const stage = (this.state.stage !== null) ? this.state.stage : this.state.courses[this.state.currentCourse].intro
    const link = 'https://player.vimeo.com/video/||ID||?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;autoplay=0'.replace('||ID||', id)
    frame = <iframe className='st-course-player' id="st-player"
      key='stage'
      src={link}
      width='1000' height='600' frameBorder='' title='Intro' webkitallowfullscreen='tr'
      allowFullScreen=''></iframe>
    let bookmark
    if (this.state.bookmarkedIds.includes(props.location)) {
      bookmark = <a title='Remove Bookmark' onClick={() => this.deleteBookmark(this.props.location.pathname)}><Icon>bookmark</Icon></a>
    }
    else {
      bookmark = <a title='Bookmark' onClick={() => this.createBookmark(this.props.location.pathname)}><Icon>bookmark_border</Icon></a>
    }
    let downloads
    if (this.state.downloads != null && this.state.downloads.length > 0) {
      downloads = <a title='Files' onClick={() => this.setState({downloadModal: true})} ><Icon>cloud_download</Icon></a>
    }
    else {
      downloads = <a title='Files' className='download-inactive' ><Icon style={{color:"white"}}>cloud_download</Icon></a>
    }
    let feedback = <Link to='/feedback' title='Feedback' ><Icon>rate_review</Icon></Link>
    let onEnded = () => {}
    return(
      <div style={{width: '1000px'}}>
          {this.state.downloadModal && <this.Downloads />}
          {frame}
          <div>
            <div className="st-video-icons">
              {feedback}
              {downloads}
              {bookmark}
            </div>
            <h5 className="st-video-label">{label}</h5>
          </div>
      </div>
    )
  }
  catch (e) {
    void(0)
  }
}


export {Stage}
