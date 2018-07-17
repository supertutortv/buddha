import React from 'react'
import {Icon} from 'react-materialize'
import {Link} from 'react-router-dom'

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
    else {
      label = ''
    }
    let frame
    if (this.state.stage == '0') {
      frame =
      <div className='sttv-course-player' style={{width:'946px', height:'594px', 'background-color' : 'black'}} frameBorder='' title='Intro' webkitallowfullscreen='tr'>
        <h3 style={{'vertical-align':'middle', 'line-height' : '594px', 'text-align':'center'}}>This video will become available when you purchase the full course</h3>
      </div>
    }
    const stage = (this.state.stage !== null) ? this.state.stage : this.state.courses[this.state.currentCourse].intro
    const link = 'https://player.vimeo.com/video/||ID||?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;autoplay=0'.replace('||ID||', this.state.stage)
    frame = <iframe className='sttv-course-player'
      key='stage'
      src={link}
      width='830' height='594' frameBorder='' title='Intro' webkitallowfullscreen='tr'
      allowFullScreen=''></iframe>
    let bookmark
    if (this.state.bookmarkedIds.includes(props.location)) {
      bookmark = <a title='Remove Bookmark' onClick={() => this.deleteBookmark(this.getBookmarkId(this.props.location.pathname))}><Icon>bookmark</Icon></a>
    }
    else {
      bookmark = <a title='Bookmark' onClick={() => this.createBookmark(this.props.location.pathname)}><Icon>bookmark_border</Icon></a>
    }
    let downloads
    if (this.state.downloads != null && this.state.downloads.length > 0) {
      downloads = <a title='Files' onClick={() => this.setState({downloadModal : true})} ><Icon>cloud_download</Icon></a>
    }
    else {
      downloads = <a title='Files' className='download-inactive' ><Icon>cloud_download</Icon></a>
    }
    let feedback = <Link to='/feedback' title='Feedback' ><Icon>rate_review</Icon></Link>
    return(
      <div>
          {this.state.downloadModal && <this.Downloads />}
          {frame}
          <div>
            <div className="st-video-icons">
              {feedback}
              {downloads}
              {bookmark}
            </div>
            <h3 className="st-video-label">{label}</h3>
          </div>
      </div>
    )
  }
  catch (e) {
    void(0)
  }
}


export {Stage}
