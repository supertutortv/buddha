import React from 'react'
import {Icon} from 'react-materialize'
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
        <div key={mark.id} className="video-in-grid">
          <a className="st-video-remover" onClick={() => this.deleteBookmark(mark.id)} ><Icon>highlight_off</Icon></a>
          <Link to={url} onClick={click}>
            <div >
              <div>
                  <img className="grid-thumb" src={thumb} className="z-depth-3"/>
              </div>
              <span className="video-grid-title"> {title} </span>
            </div>
          </Link>
        </div>
      )
    }
    catch (e) {
      void(0)
    }
  }
  return(
    <div className="video-grid">
      {bookmarks.reverse()}
    </div>
  )
}

function getBookmarkId(url){
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
        <div key={mark.id} className="video-in-grid">
          <a className="st-video-remover" onClick={() => this.deleteBookmark(mark.id)} ><Icon>highlight_off</Icon></a>
          <Link to={url} onClick={click}>
            <div >
              <div>
                  <img className="grid-thumb" src={thumb} className="z-depth-3"/>
              </div>
              <span className="video-grid-title"> {title} </span>
            </div>
          </Link>
        </div>
      )
    }
    catch (e) {
      void(0)
    }
  }
  return(
    <div className="video-grid">
      {bookmarks.reverse()}
    </div>
  )
}

export {Bookmarks, getBookmarkId}
