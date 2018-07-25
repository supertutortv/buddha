import React from 'react'
import {Link} from 'react-router-dom'
import {Icon} from 'react-materialize'

// Review component; needs backend support
function Review(props) {
  return(
    <div id="ratings-modal-wrapper">
      <div className="header center-align">
        <h2>Rate this course</h2>
        <p>Rate us and leave a review so others
        can see how this course has helped you!</p>
      </div>
      <section className="rating-widget">
        <div className="rating-stars center-align">
          <a className={this.state.ratingLock > 0 ? 'star-active-lock' : this.state.rating > 0 ? 'star-active' : 'star'} onMouseOver={() => this.setState({rating:1})} onMouseOut={() => this.setState({rating:0})}
            onClick={(e) => {this.setState({ratingLock:1}); e.stopPropagation()}}><Icon>star</Icon></a>
          <a className={this.state.ratingLock > 1 ? 'star-active-lock' : this.state.rating > 1 ? 'star-active' : 'star'} onMouseOver={() => this.setState({rating:2})} onMouseOut={() => this.setState({rating:0})}
            onClick={(e) => {this.setState({ratingLock:2}); e.stopPropagation()}}><Icon>star</Icon></a>
          <a className={this.state.ratingLock > 2 ? 'star-active-lock' : this.state.rating > 2 ? 'star-active' : 'star'} onMouseOver={() => this.setState({rating:3})} onMouseOut={() => this.setState({rating:0})}
            onClick={(e) => {this.setState({ratingLock:3}); e.stopPropagation()}}><Icon>star</Icon></a>
          <a className={this.state.ratingLock > 3 ? 'star-active-lock' : this.state.rating > 3 ? 'star-active' : 'star'} onMouseOver={() => this.setState({rating:4})} onMouseOut={() => this.setState({rating:0})}
            onClick={(e) => {this.setState({ratingLock:4}); e.stopPropagation()}}><Icon>star</Icon></a>
          <a className={this.state.ratingLock > 4 ? 'star-active-lock' : this.state.rating > 4 ? 'star-active' : 'star'} onMouseOver={() => this.setState({rating:5})} onMouseOut={() => this.setState({rating:0})}
            onClick={(e) => {this.setState({ratingLock:5}); e.stopPropagation()}}><Icon>star</Icon></a>
        </div>
        <div className="message-box" onClick={(e) => e.stopPropagation()}>
        <textarea placeholder="Enter your review here." className="st-textarea" name="review" value={this.state.review} onChange={this.handleChange}></textarea>
        </div>
      </section>
      <p className="center-align">
        <small>Not to be confused with <Link to='/feedback'><b>feedback</b></Link>,
        which is where you can report any issues or make suggestions to improve the course.
        </small>
      </p>
      <div className="ratings-submit-container center-align">
        <a className="btn" disabled={this.state.ratingLock == null || this.state.review == null || this.state.review == ''}onClick={() => console.log("This will submit the review")}>
          <strong>Submit Your Review</strong>
        </a>
      </div>
    </div>
  )
}

export {Review}
