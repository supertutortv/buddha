import React from 'react'
import {Icon, Row, Col} from 'react-materialize'
import {Link} from 'react-router-dom'

function getBookmarkId(url) {
  for (let index in this.state.user.bookmarks) {
    let bookmark = this.state.user.bookmarks[index]
    if (bookmark.data.url == url) {
      return bookmark.id
    }
  }
  return null
}

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
      if (vid && vid.data && vid.data.type == 'collection') {
        id = vid.data.intro
        thumb = id
      }
      else {
        id = vid.id
        thumb = vid.thumb
      }
      thumb = thumbURL.replace('||ID||', thumb)
      vid = this.getResourceByUrl(url)
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
        click = () => this.updateStage(String(vid.id))
      }
      bookmarks.push(
        <Col s={8} m={4} l={3} key={mark.id}>
          <div className="video-in-grid">
            <a className="st-video-remover" onClick={(e) => {e.stopPropagation(); console.log('bang!')}} ><Icon>highlight_off</Icon></a>
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
  return(
    <div>
      <Row>
        {bookmarks.reverse()}
      </Row>
    </div>
  )
}

export {Bookmarks, getBookmarkId}
