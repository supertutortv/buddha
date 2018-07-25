import React from 'react'
import {Row, Col} from 'react-materialize'

// A modal which contains the downloads for a course section
function Downloads(props) {
  let index = 0
  let files = []
  for (let item in this.state.downloads) {
    let download = this.state.downloads[item]
    let file = download.file.split('/').filter(String)
    let res = file[2]
    let section = file[1]
    let test = file[0]
    files.push(
      <Col s={12} m={6} l={4} key={index}>
        <a className='download-link' href={'https://api.supertutortv.com/course-dl.php?' + 'res=' + res + '&section=' + section + '&test=' + test + '&hash=' + download.hash}>
          &#8226; {download.name}
        </a>
      </Col>
    )
    index++
  }
  return (
    <div className="st-modal" onClick={() => this.setState({downloadModal: false})}>
      <div className="st-downloads" onClick={(e) => e.stopPropagation()} >
        <h3>Downloads:</h3>
        <Row>
          {files}
        </Row>
      </div>
    </div>
  )
}

export {Downloads}
