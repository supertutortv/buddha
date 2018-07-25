import React from 'react';
import {Link} from 'react-router-dom'
import {cleanup, getResourceByUrl} from './utilities.js'

// Unused component that provides a more granular grading approach. See the
// bottom for an example of the data structure. Left here in case it saves
// some time in the future.
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

// <Route className='st-link' path='/dashboard'
// render={() => <this.Grader
//   thumb={this.state.thumb}
//   course={this.state.courses}
//   buckets={{
//   75 : 36, 72 : 35, 71 : 34, 70 : 33, 68 : 32,
//   67 : 31, 66 : 30, 65 : 29, 63 : 28, 62 : 27,
//   60 : 26, 58 : 25, 56 : 24, 53 : 23, 51 : 22,
//   48 : 21, 45 : 20, 43 : 19, 41 : 18, 39 : 17,
//   36 : 16, 32 : 15, 29 : 14, 27 : 13, 25 : 12,
//   23 : 11, 20 : 10, 18 : 9, 15 : 8, 12 : 7,
//   10 : 6, 8 : 5, 6 : 4, 4 : 3, 2 : 2, 0 : 1 }}
//   name={"ACT English Practice 1"}
//   endpoint={"fakeEndpoint"}
//   data={{
//     grading: {
//       '1': {
//         answer: 'a',
//         suggestions: {
//           all: ['the-best-act-prep-course-ever/english/content/diction']}
//       },
//       '2': {
//         answer: 'g',
//         suggestions: {
//           all: ['the-best-act-prep-course-ever/english/content/commas-part-i-rules', 'the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
//         }
//       },
//       '3': {
//         answer: 'a',
//         suggestions: {
//           all: ['the-best-act-prep-course-ever/english/content/diction']
//         }
//       },
//       '4': {
//         answer: 'f',
//         suggestions: {
//           all: ['the-best-act-prep-course-ever/english/content/commas-part-i-rules', 'the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
//         }
//       },
//       '5': {
//         answer: 'c',
//         suggestions: {
//           all: ['the-best-act-prep-course-ever/english/content/verbs-when-to-use-which-tense']
//         }
//       },
//       '6': {
//         answer: 'f',
//         suggestions: {
//           all : ['the-best-act-prep-course-ever/english/content/dashes-colons-semicolons', 'the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
//         }
//       },
//       '7': {
//         answer: 'd',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/diction']
//     		}
//       },
//       '8': {
//         answer: 'g',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/long-transitions']
//     		}
//       },
//       '9': {
//         answer: 'c',
//         suggestions: {
//           all : []
//         }
//       },
//       '10': {
//         answer: 'j',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/long-transitions']
//     		}
//       },
//       '11': {
//         answer: 'c',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/pronouns-part-i']
//     		}
//       },
//       '12': {
//         answer: 'f',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/diction']
//     		}
//       },
//       '13': {
//         answer: 'b',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/main-ideas']
//     		}
//       },
//       '14': {
//         answer: 'j',
//         suggestions: {
//           all : ['the-best-act-prep-course-ever/english/content/verbs-introduction'],
//           a : ['the-best-act-prep-course-ever/english/content/verbs-subject-verb-agreement']
//     		}
//       },
//       '15': {
//         answer: 'b',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/commas-part-i-rules', 'the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
//     		}
//       },
//       '16': {
//         answer: 'g',
//         suggestions: {
//           all : []
//     		}
//       },
//       '17': {
//         answer: 'c',
//         suggestions: {
//           all : ['the-best-act-prep-course-ever/english/content/dashes-colons-semicolons']
//     		}
//       },
//       '18': {
//         answer: 'f',
//         suggestions: {
//           all : ['the-best-act-prep-course-ever/english/content/commas-part-i-rules', 'the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
//     		}
//       },
//       '19': {
//         answer: 'c',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/short-transitions']
//     		}
//       },
//       '20': {
//         answer: 'g',
//         suggestions: {
//     			all : []
//     		}
//       },
//       '21': {
//         answer: 'd',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/long-transitions']
//     		}
//       },
//       '22': {
//         answer: 'g',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/diction']
//     		}
//       },
//       '23': {
//         answer: 'c',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/verbs-when-to-use-which-tense']
//     		}
//       },
//       '24': {
//         answer: 'h',
//         suggestions: {
//           all : ['the-best-act-prep-course-ever/english/content/diction']
//     		}
//       },
//       '25': {
//         answer: 'b',
//         suggestions: {
//           all : ['the-best-act-prep-course-ever/english/content/verbs-when-to-use-which-tense']
//     		}
//       },
//       '26': {
//         answer: 'f',
//         suggestions: {
//           all : ['the-best-act-prep-course-ever/english/content/commas-part-i-rules', 'the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
//     		}
//       },
//       '27': {
//         answer: 'c',
//         suggestions: {
//     			all : []
//     		}
//       },
//       '28': {
//         answer: 'f',
//         suggestions: {
//           all : ['the-best-act-prep-course-ever/english/content/pronouns-part-ii', 'the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
//     		}
//       },
//       '29': {
//         answer: 'd',
//         suggestions: {
//           all : ['the-best-act-prep-course-ever/english/content/commas-part-i-rules', 'the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
//     		}
//       },
//       '30': {
//         answer: 'g',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/placement']
//     		}
//       },
//       '31': {
//         answer: 'c',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/modifiers']
//     		}
//       },
//       '32': {
//         answer: 'j',
//         suggestions: {
//     			all : [],
//           g: ['the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
//     		}
//       },
//       '33': {
//         answer: 'c',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/placement']
//     		}
//       },
//       '34': {
//         answer: 'g',
//         suggestions: {
//           all : ['the-best-act-prep-course-ever/english/content/commas-part-i-rules', 'the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
//     		}
//       },
//       '35': {
//         answer: 'a',
//         suggestions: {
//           all : ['the-best-act-prep-course-ever/english/content/placement']
//     		}
//       },
//       '36': {
//         answer: 'j',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/short-transitions']
//     		}
//       },
//       '37': {
//         answer: 'c',
//         suggestions: {
//           all : ['the-best-act-prep-course-ever/english/content/placement']
//     		}
//       },
//       '38': {
//         answer: 'f',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/modifiers']
//     		}
//       },
//       '39': {
//         answer: 'd',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/parallel-structure']
//     		}
//       },
//       '40': {
//         answer: 'h',
//         suggestions: {
//           all : ['the-best-act-prep-course-ever/english/content/diction']
//     		}
//       },
//       '41': {
//         answer: 'b',
//         suggestions: {
//           all : ['the-best-act-prep-course-ever/english/content/placement']
//     		}
//       },
//       '42': {
//         answer: 'f',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/verbs-when-to-use-which-tense']
//     		}
//       },
//       '43': {
//         answer: 'c',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/placement']
//     		}
//       },
//       '44': {
//         answer: 'g',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/pronouns-part-i']
//     		}
//       },
//       '45': {
//         answer: 'a',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/questions-with-stems']
//     		}
//       },
//       '46': {
//         answer: 'f',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/pronouns-part-i']
//     		}
//       },
//       '47': {
//         answer: 'b',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/verbs-tense-overview']
//     		}
//       },
//       '48': {
//         answer: 'g',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/commas-part-i-rules', 'the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
//     		}
//       },
//       '49': {
//         answer: 'd',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/questions-with-stems']
//     		}
//       },
//       '50': {
//         answer: 'f',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/verbs-subject-verb-agreement']
//     		}
//       },
//       '51': {
//         answer: 'b',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/dashes-colons-semicolons']
//     		}
//       },
//       '52': {
//         answer: 'f',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/long-transitions']
//     		}
//       },
//       '53': {
//         answer: 'd',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/commas-part-i-rules']
//     		}
//       },
//       '54': {
//         answer: 'h',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/verbs-subject-verb-agreement']
//     		}
//       },
//       '55': {
//         answer: 'd',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
//     		}
//       },
//       '56': {
//         answer: 'h',
//         suggestions: {
//           all : ['the-best-act-prep-course-ever/english/content/verbs-subject-verb-agreement']
//     		}
//       },
//       '57': {
//         answer: 'a',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/commas-part-i-rules']
//     		}
//       },
//       '58': {
//         answer: 'g',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/questions-with-stems']
//     		}
//       },
//       '59': {
//         answer: 'c',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/questions-with-stems', 'the-best-act-prep-course-ever/english/content/placement']
//     		}
//       },
//       '60': {
//         answer: 'j',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/questions-with-stems']
//     		}
//       },
//       '61': {
//         answer: 'c',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/verbs-tense-overview']
//     		}
//       },
//       '62': {
//         answer: 'g',
//         suggestions: {
//           all : ['the-best-act-prep-course-ever/english/content/commas-part-i-rules', 'the-best-act-prep-course-ever/english/content/commas-part-ii-common-errors']
//     		}
//       },
//       '63': {
//         answer: 'd',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/modifiers']
//     		}
//       },
//       '64': {
//         answer: 'j',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/short-transitions']
//     		}
//       },
//       '65': {
//         answer: 'b',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/questions-with-stems']
//     		}
//       },
//       '66': {
//         answer: 'f',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/verbs-approach']
//     		}
//       },
//       '67': {
//         answer: 'b',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/verbs-when-to-use-which-tense']
//     		}
//       },
//       '68': {
//         answer: 'f',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/long-transitions']
//     		}
//       },
//       '69': {
//         answer: 'd',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/long-transitions']
//     		}
//       },
//       '70': {
//         answer: 'f',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/verbs-introduction']
//     		}
//       },
//       '71': {
//         answer: 'c',
//         suggestions: {
//           all : ['the-best-act-prep-course-ever/english/content/questions-with-stems']
//     		}
//       },
//       '72': {
//         answer: 'h',
//         suggestions: {
//           all : ['the-best-act-prep-course-ever/english/content/questions-with-stems']
//     		}
//       },
//       '73': {
//         answer: 'd',
//         suggestions: {
//     			all : ['the-best-act-prep-course-ever/english/content/diction']
//     		}
//       },
//       '74': {
//         answer: 'f',
//         suggestions: {
//           all : ['the-best-act-prep-course-ever/english/content/questions-with-stems']
//     		}
//       },
//       '75': {
//         answer: 'd',
//         suggestions: {
//           all : ['the-best-act-prep-course-ever/english/content/questions-with-stems', 'the-best-act-prep-course-ever/english/content/placement']
//     		}
//       }
//     },
//     analysis : {
//       blank : {
//         threshold : 5,
//         link: 'the-best-act-prep-course-ever/english/tips/pacing-strategies'
//       },
//       score : {
//         threshold: 25,
//         link : 'the-best-act-prep-course-ever/english/tips/general-strategies'
//       }
//     }
//   }
// }
// />}
// />
