import React from 'react';
import {Link} from 'react-router-dom'
import {cleanup, getResourceByUrl} from './utilities.js'

class Grader extends React.Component {
  constructor(props) {
    super(props)
    let section = {}
    for (let i = 1; i <= Object.keys(props.data.grading).length; i++) {
      section[i] = ''
    }
    this.state = {
      courses: JSON.parse(localStorage.getItem('sttv_data')).courses,
      questions: section
    };
    this.length = Object.keys(props.data.grading).length,
    this.updateSection = this.updateSection.bind(this)
    this.rawScore = this.rawScore.bind(this)
    this.submitSection = this.submitSection.bind(this)
    this.getResourceByUrl = getResourceByUrl.bind(this)
  }

  componentDidMount() {
    try {
      const questions = JSON.parse(localStorage.getItem(this.props.name))
      if (questions != null) {
        this.setState({questions: questions})
      }
    }
    catch(e) {
      void(0)
    }
  }

  componentWillUnmount() {
    localStorage.setItem(this.props.name, JSON.stringify(this.state.questions))
  }

  updateSection(event) {
    let copy = this.state.questions
    if (copy[event.target.id] == event.target.value) {
      copy[event.target.id] = ''
    }
    else {
      copy[event.target.id] = event.target.value
    }
    this.setState({questions: copy})
  }

   rawScore() {
      let raw = 0
      for (let question in this.state.questions) {
         if (this.state.questions[question] == this.props.data.grading[question].answer) {
         raw += 1
         }
      }
      return raw
   }

   scaledScore() {
     let raw = this.rawScore()
     let converted
     while (true) {
       if (raw in this.props.buckets){
         converted = this.props.buckets[raw]
         break;
       }
       else {
         raw -= 1}}
         return converted
   }

   submitSection(e) {
     e.preventDefault()
     console.log(('This will submit their score to ' + this.props.endpoint))
   }

   render() {
       let length = this.length
       let table = []
       for (let i = 1; i <= length; i++) {
         let buttons
         if (i%2 == 1) {
           buttons =
           <div>
             <label>
               <input type="checkbox" value='a' id={i} onChange={(e) => this.updateSection(e)} id={i} checked={this.state.questions[i] == 'a'} />
             A</label>
             <label>
               <input type="checkbox" value='b' id={i} onChange={(e) => this.updateSection(e)} id={i} checked={this.state.questions[i] == 'b'} />
             B</label>
             <label>
               <input type="checkbox" value='c' id={i} onChange={(e) => this.updateSection(e)} id={i} checked={this.state.questions[i] == 'c'} />
             C</label>
             <label>
               <input type="checkbox" value='d' id={i} onChange={(e) => this.updateSection(e)} id={i} checked={this.state.questions[i] == 'd'} />
             D</label>
          </div>
        }
        else {
          buttons =
          <div>
            <label>
              <input type="checkbox" value='f' id={i} onChange={(e) => this.updateSection(e)} id={i} checked={this.state.questions[i] == 'f'} />
            F</label>
            <label>
              <input type="checkbox" value='g' id={i} onChange={(e) => this.updateSection(e)} id={i} checked={this.state.questions[i] == 'g'} />
            G</label>
            <label>
              <input type="checkbox" value='h' id={i} onChange={(e) => this.updateSection(e)} id={i} checked={this.state.questions[i] == 'h'} />
            H</label>
            <label>
              <input type="checkbox" value='j' id={i} onChange={(e) => this.updateSection(e)} id={i} checked={this.state.questions[i] == 'j'} />
            J</label>
          </div>
        }
        table.push(
          <div key={i} id={i}>
            <h1 style={this.state.questions[String(i)] == ''  ?
              {color : 'white'} :(this.state.questions[String(i)] == this.props.data.grading[i].answer ?
              {color: 'springGreen'} : {color: 'orangeRed'})}>{i}.</h1>
              {buttons}
          </div>)
        }
        let recs = {}
        let blank = 0
        for (let question in this.state.questions) {
          if (this.state.questions[question] == '') {
            blank++
          }
          if (this.state.questions[question] != this.props.data.grading[question].answer) {
            for (let answer in this.props.data.grading[question].suggestions) {
              if (answer == this.state.questions[question] || answer == 'all') {
                const blame = answer == 'all' ? 'You missed question ' + question :'You put "' + answer + '" for ' + question
                for (let index in this.props.data.grading[question].suggestions[answer]) {
                  let rec = this.props.data.grading[question].suggestions[answer][index]
                  if (rec in recs) {
                    recs[rec].push(blame)
                  }
                  else {
                    recs[rec] = [blame]
                  }
                }
              }
            }
          }
        }
        if (blank > this.props.data.analysis.blank.threshold) {
          const blankBlame = 'You left more than ' + this.props.data.analysis.blank.threshold + ' questions blank'
          if (this.props.data.analysis.blank.link in recs) {
            recs[this.props.data.analysis.blank.link].push(blankBlame)
          }
          else {
            recs[this.props.data.analysis.blank.link] = [blankBlame]
          }
        }
        if (this.scaledScore() < this.props.data.analysis.score.threshold) {
          const scoreBlame = 'You scored less than a ' + this.props.data.analysis.score.threshold
          if (this.props.data.analysis.score.link in recs) {
            recs[this.props.data.analysis.score.link].push(scoreBlame)
          }
          else {
            recs[this.props.data.analysis.score.link] = [scoreBlame]
          }
        }
        let formattedRecs = []
        let index = 0
        for (let link in recs) {
          let blameString = 'Because : ' + recs[link].join(', ')
          let vid = this.getResourceByUrl(link)
          console.log(vid)
          let thumb = this.props.thumb.replace('||ID||', vid.thumb)
          formattedRecs.push(
            <div key={index} className="video-in-grid">
              <Link to={link}>
                <div >
                  <div>
                      <img className="grid-thumb" src={thumb} className="z-depth-3"/>
                  </div>
                  <span className="video-grid-title"> {cleanup(link)} </span>
                </div>
              </Link>
              {blameString}
            </div>
          )
          index++
        }
     return (
       <div className="App">
         <h1 className="App-title">ACT Practice Test Score Report for: {this.props.name}</h1>
         <form onSubmit={e => this.submitSection(e)}>
           <h1>Check the box of each question you missed</h1>
           {table}
           <h3> {this.rawScore()} / {this.length}
           &harr;
           {this.scaledScore()} / 36</h3>
           <button>Submit Score</button>
         </form>
         {formattedRecs}
       </div>
     );
   }
}

export {Grader}
