import React from 'react';

class Grader extends React.Component {
  constructor(props) {
   super(props);
   let section = {}
   for (let i = 1; i <= props.length; i++){
     section[i] = 1
   }
   this.state = {
     questions: section,
     buckets: props.buckets,
     length: props.length,
     name: props.name,
     endpoint: props.endpoint};
   this.Section = this.Section.bind(this)
   this.updateSection = this.updateSection.bind(this)
   this.rawScore = this.rawScore.bind(this)
   this.submitSection = this.submitSection.bind(this)
}

   updateSection(id) {
     let copy = this.state
     copy.questions[id] = 1 - copy.questions[id]
     this.setState({section: copy})
   }

   Section() {
     let length = this.state.length
     let table = []
     for (let i = 1; i <= length; i++) {
       table.push(
         <div key={i} id={i}>
            {i}:
            <input type="checkbox" onClick={() => this.updateSection(i)} id={i}>
            </input>
        </div>)
     }
     return table
   }

   rawScore(section) {
      let length = this.state.length
      let raw = 0
      for (let j = 1; j<= length; j++){
        raw += this.state.questions[j]
      }
      return raw
    }

    scaledScore(section){
        let raw = this.rawScore(section)
        let converted
        while (true){
          if (raw in this.state.buckets){
             converted = this.state.buckets[raw]
             break;
          }
          else {
            raw -= 1}}
        return converted
    }

  submitSection(e){
    e.preventDefault()
    console.log('This will submit their score to ' + this.state.endpoint)
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">ACT Practice Test Score Report for: {this.state.name}</h1>
        <form onSubmit={e => this.submitSection(e)}>
          <h1>Check the box of each question you missed</h1>
            <this.Section />
            <h3> {this.rawScore(this.state.name)} / {this.state.length}
             &harr;
            {this.scaledScore(this.state.name)} / 36</h3>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export {Grader}
