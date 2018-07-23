import React from 'react';

function PracticeTest(props) {
  return (
    <div>
      <h3>
        {props.name}
      </h3>
      <p>
        In the following section, fill in the boxes with comma-separated lists
        of numbers as indicated. The information you give us lets us grade your
        test and generate a custom study plan designed to improve your score.
        Your score on the exam is only based on the number of questions you
        answered correctly, but telling us where you guessed and what you left
        blank allows us to focus on the content and strategies that will be most
        helpful for you.
      </p>
      <span>Missed Questions:</span>
      <div>
        <textarea value={this.state.missed} onChange={this.handleChange} placeholder="Enter the number of each question you answered incorrectly (e.g. 1, 34, 35, 68)" className="sttv-textarea"  name="missed" />
      </div>
      <span>Skipped Questions:</span>
      <div>
        <textarea value={this.state.blank} onChange={this.handleChange}  placeholder="Enter the number of each question you left blank (e.g. 8, 73, 74, 75)" className="sttv-textarea"  name="blank" />
      </div>
      <span>Questions you guessed on but got right:</span>
      <div>
        <textarea value={this.state.guessed} onChange={this.handleChange}  placeholder="Enter the number of each question you guessed on but still got right (e.g. 4, 53)" className="sttv-textarea"  name="guessed" />
      </div>
      <button onClick={() => console.log(this.state.missed, this.state.blank, this.state.guessed)}>Grade</button>
    </div>
  )
}

export {PracticeTest}
