import React from 'react'
import {Link} from 'react-router-dom'

// Feedback component; needs styling and backend support
function Feedback(props) {
  return(
    <div id="course-feedback">
      <h2 className="header center-align">Feedback</h2>
      <div className="col s12 center-align">
        <p>
          Drop us a line if you catch any mistakes, have any suggestions,
          or would just like to let us know how we're helping you get a
          better score! If you'd like to rate us so future students can see what
          you think of the course, you can do that <Link to='/review' style={{text: 'bold'}}><b>here</b></Link>.
          (By the way, this is just between us... no one else will see
          your feedback but the fine folks here at SupertutorTV.)
       </p>
     </div>
    <div className="col s12" id="feedback-post-form">
      <div className="overlay"></div>
      <textarea placeholder="Enter your feedback here." className="st-textarea"  name="feedback" value={this.state.feedback} onChange={this.handleChange} />
      <div className="feedback-submit-container center-align">
        <br />
        <a className="feedback-submit-button btn" disabled={this.state.feedback == null || this.state.feedback == ''} onClick={() => console.log('This will submit feedback')}>
          <strong>Submit Feedback</strong>
        </a>
      </div>
    </div>
  </div>
  )
}

export {Feedback}
