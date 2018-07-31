import React from 'react'
import {Link} from 'react-router-dom'

// Placeholder
function Help(props) {
  return(
    <div>
      If you'd like to report any issues or make suggestions to improve the
      course, you can do that <Link to='/feedback'><b>here</b></Link>. If
      you’re a student looking for specific advice from Brooke, and not
      interested in private tutoring, your best bet is to
      <a href="https://www.quora.com/profile/Brooke-Hanson-3"><b> check out her
      Quora </b></a> or leave a comment on one of our
      <a href="https://www.youtube.com/channel/UCeFijbdY7voIOnfRzWq4oSw"><b> YouTube
      videos</b></a>.
    </div>
  )
}

export {Help}
