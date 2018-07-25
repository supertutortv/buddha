import React from 'react'
import {Icon, Row, Col} from 'react-materialize'
import {Link} from 'react-router-dom'

// Bookmarks component. Contains a grid of videos which can be removed from
// the local and remote objects by deleteBookmark
function Bookmarks(props) {
  let bookmarks = []
  const thumbURL = this.state.thumb
  for (let item in this.state.user.bookmarks) {
    try {
      let mark = this.state.user.bookmarks[item]
      let url = this.state.user.bookmarks[item].data.url
      let vid = this.getResourceByUrl(url)
      let id
      let thumb
      // Checks to see if the bookmarked item is really a video.
      if (vid && vid.data && vid.data.type == 'collection') {
        // If this clause is true, it's actually a collection
        id = vid.data.intro
        // This should eventually be thumb=vid.data.thumb, when thumbs are added to data objects
        thumb = id
      }
      else {
        // Otherwise, it's a video
        id = vid.id
        thumb = vid.thumb
      }
      thumb = thumbURL.replace('||ID||', thumb)
      const titleBase = url.slice(1).split('/')
      let title
      if (vid.name) {
        titleBase.pop()
        title = this.cleanup(titleBase.join('/')) + ' > ' + vid.name
      }
      else {
        title = this.cleanup(titleBase.join('/'))
      }
      let click
      if (vid.id) {
        click = () => this.setState({stage: String(vid.id)})
      }
      bookmarks.push(
        <Col s={8} m={4} l={3} key={mark.id}>
          <div className="video-in-grid">
            <a className="st-video-remover" onClick={(e) => e.stopPropagation()} ><Icon>highlight_off</Icon></a>
            <Link to={url} onClick={click}>
              <div >
                <div>
                  <img className="grid-thumb" src={thumb}/>
                </div>
                <span className="grid-label"> {title} </span>
              </div>
            </Link>
          </div>
        </Col>
      )
    }
    catch (e) {
      void(0)
    }
  }
  // Reversed so that they are ordered new to old
  return(
    <div>
      <Row>
        {bookmarks.reverse()}
      </Row>
    </div>
  )
}

export {Bookmarks}
