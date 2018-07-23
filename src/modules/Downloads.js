import React from 'react'
import {Row, Col} from 'react-materialize'


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
      <Col s={4} key={index}>
        <a className='download-link' href={'https://api.supertutortv.com/course-dl.php?' + 'res=' + res + '&section=' + section + '&test=' + test + '&hash=' + download.hash}>
          {download.name}
        </a>
      </Col>
    )
    index++
  }
  return (
    <div className="sttv-modal" onClick={() => this.setState({downloadModal: false})}>
      <div className="sttv-downloads" onClick={(e) => e.stopPropagation()} >
        <h3>Downloads:</h3>
        <Row>
          {files}
        </Row>
      </div>
    </div>
  )
}

export {Downloads}
