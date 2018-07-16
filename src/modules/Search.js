import React from 'react'
import {Link} from 'react-router-dom'

// Searches the course structure and returns links, used by the Search component
function searchCourse(query, object, path) {
  const results = []
  if (!query || !object) {
    return []
  }
  else {
    for (let i in object) {
      let newPath = path + '/' + i
      if (object[i].data && object[i].data.name.toLowerCase().includes(query.toLowerCase())) {
        results.push(newPath)
      }
      else if ('name' in object[i] && object[i].name.toLowerCase().includes(query.toLowerCase())) {
        results.push(newPath)
      }
      else {
        const subresult = this.searchCourse(query, object[i].collection, newPath)
        for (let result in subresult) {
          results.push(subresult[result])
        }
      }
    }
  }
  return results
}

// Search component; opens a modal over the rest of the course and calls the
// searchCourse whenever the textbox is updated.
function Search() {
  let links = []
  let index = 0
  const results = this.searchCourse(this.state.query, this.state.courses[this.state.currentCourse].collection, this.state.currentCourse)
  if (this.state.query.length == 0) {
    links = 'Begin typing to search this course'
  }
  else if (results.length == 0) {
    links = 'No results found'
  }
  else {
    try {
      for (let item in results) {
      links.push(
        <li className="search-result" key={index}>
          <Link to={'/' + results[item]} onClick={() => this.setState({search : false, nav: true})}>
            {this.cleanup(results[item])}
          </Link>
          <br/>
        </li>
        )
        index++
      }
    }
    catch (error) {
      links = 'Type more than three characters to search this course.'
    }
  }
  return(
    <div className="sttv-modal" onClick={() => this.setState({search: false})} onKeyDown={(e) => {if (e.keyCode == 27){this.setState({search:false})}}}>
      <div className="sttv-search" onClick={(e) => e.stopPropagation()} >
        <h3>Searching: {this.cleanup(this.state.currentCourse)}</h3>
        <input className="sttv-searchbox" autoComplete="off" type="text" name="query" value={this.state.query} onChange={this.handleChange}>
        </input>
        <ul className="sttv-search-results">
          {links}
        </ul>
      </div>
    </div>
  )
}

export {Search, searchCourse}
