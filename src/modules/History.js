import React from 'react'
import {Link} from 'react-router-dom'
import {Icon, Row, Col} from 'react-materialize'

// History component. Contains a grid of videos which is currently static
function History(props) {
  try {
    let vids = []
    let index = 0
    const history = this.state.user.history
    const thumbURL = this.state.thumb
    for (let item in history) {
      let url = history[item].data.url
      let vid = this.getResourceByUrl(url)
      if (vid != null) {
        let thumb = thumbURL.replace('||ID||', vid.thumb)
        let click
        if (vid.id) {
          click = () => this.setState({stage: String(vid.id)})
        }
        vids.push(
          <Col s={8} m={4} l={3} key={index}>
            <div key={index} className="video-in-grid">
              <Link to={url} onClick={click}>
                <div >
                  <div>
                      <img src={thumb} className="grid-thumb"/>
                  </div>
                  <span className="grid-label"> {this.cleanup(url.slice(1))} </span>
                </div>
              </Link>
            </div>
          </Col>
        )
        index++
      }
    }
    if (vids.length > 0) {
      return(
        // Reversed so that they are ordered new to old
        <Row>
          {vids.reverse()}
        </Row>
      )
    }
    else {
      return (
        <h6>
          It looks like you don't have any watch history! Try watching some
          videos.
        </h6>
      )
    }
  }
  catch (e) {
  }
 }

export {History}
