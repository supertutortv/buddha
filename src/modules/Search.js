import React from 'react'
import {Link} from 'react-router-dom'

// Searches the course structure and returns links, used by the Search component
function searchCourse(query, object, path) {
  const results = []
  function searchFormat(string) {
    return string.toLowerCase().replace(/[^a-zA-z0-9 ]/g, '').replace(/\s{2,}/, ' ')
  }
  const cleanedQuery = searchFormat(query)
  if (!query || !object) {
    return []
  }
  else {
    for (let i in object) {
      let newPath = path + '/' + i
      if (object[i].data && searchFormat(object[i].data.name).includes(cleanedQuery)) {
        results.push(newPath)
      }
      else if ('name' in object[i] && searchFormat(object[i].name).includes(cleanedQuery)) {
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
  const results = this.searchCourse(this.state.query, this.state.courses[this.state.currentCourse].collection, '')
  if (this.state.query.length == 0) {
    links = 'Begin typing to search this course'
  }
  else if (results.length == 0) {
    links = 'No results found'
  }
  else {
    try {
      links.push(<div key={-1}>Results:</div>)
      for (let item in results) {
      links.push(
        <li key={index} className="st-result">
          <Link to={'/' + this.state.currentCourse + results[item]} >
            {this.cleanup(results[item].substring(1))}
          </Link>
          <br/>
        </li>
        )
        index++
      }
    }
    catch (error) {
      links = 'Invalid query'
    }
  }
  if (this.state.query == 'matrix') {
    if (this.state.matrixMode) {
      links.push(<li className="st-result"><Link to='/dashboard' style={{color:'rgb(0, 255, 0)', fontSize: 'large'}} onClick={() => this.setState({matrixMode: false})} >電話に出る</Link></li>)
    }
    else {
      links.push(<li className="st-result"><Link to='/dashboard' style={{color:'rgb(0, 255, 0)', fontSize: 'large'}} onClick={() => this.setState({matrixMode: true})} >赤い丸薬を取る</Link></li>)
    }
  }
  return(
    <div className="st-modal" onClick={() => this.setState({search: false})} onKeyDown={(e) => {if (e.keyCode == 27){this.setState({search:false})}}}>
      <div className="st-search" >
        <h3>Searching: {this.cleanup(this.state.currentCourse)}</h3>
        <input className="st-searchbox" autoFocus autoComplete="off" type="text" name="query" value={this.state.query} onChange={this.handleChange}  onClick={(e) => e.stopPropagation()}>
        </input>
        <ul className="st-search-results" >
          {links}
        </ul>
      </div>
    </div>
  )
}

export {Search, searchCourse}
