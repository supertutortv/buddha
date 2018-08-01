// Deletes a bookmark from the remote object; uses the server's response to
// delete the bookmark from the state and the localStorage object. Relies on
// getBookmarkId.
function deleteBookmark(url) {
  const ids = getIdsByUrl(url, this.state.user.bookmarks)
  fetch('https://api.supertutortv.com/v2/courses/data', {
  method: 'DELETE',
  accept: 'application/vnd.sttv.app+json',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      id: ids
    })
  })
  .then(response => this.handleResponse(response))
  .then(items => {
    if (items !== null) {
      let user = this.state.user
      for (let item in user.bookmarks) {
        if (user.bookmarks[item].id == items.data[0].id) {
          user.bookmarks.splice(item, 1)
        }
      }
      let course_data = JSON.parse(localStorage.getItem('sttv_data'))
      course_data.user = user
      localStorage.setItem('sttv_data', JSON.stringify(course_data))
      // bookmarkedIds is in the state to efficiently set the behavior and appearance
      // of a video's bookmark icon when it is in the stage; otherwise, this would have
      // to be done on each video change. Not pretty, I am aware.
      this.setState({user: user, bookmarkedIds: user.bookmarks.map(a => a.data.url)})
    }
    else {
      this.setState({message: 'Could not remove that bookmark. Please try again later.'})
    }
  })
  .catch(error => {
    this.getData()
  })
}

// Try localStorage; if it is empty, fetch new data
function getData() {
  const data = JSON.parse(localStorage.getItem('sttv_data'))
  if (data !== null) {
    const courses = Object.keys(data.courses)
    const currentCourse = courses.length > 0 ? courses[0] : null
    const bookmarkedIds = data.user.bookmarks != null ? data.user.bookmarks.map(a => a.data.url) : []
    let thumb
    let stage
    if (currentCourse != null && !(data.courses[currentCourse] instanceof Array)) {
      thumb = data.courses[currentCourse].data.thumbUrls.plain
      stage = data.courses[currentCourse].data.intro
    }
    else {
      thumb = ''
      stage = ''
    }
    this.setState({
      courses: data.courses,
      bookmarkedIds: bookmarkedIds,
      user: data.user,
      currentCourse: currentCourse,
      thumb: thumb,
      stage: stage,
    })
  }
  else {
    fetch('https://api.supertutortv.com/v2/courses/data', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => this.handleResponse(response))
    .then(items => {
      if (items !== null) {
        localStorage.setItem('sttv_data', JSON.stringify(items.data))
        const courses = Object.keys(items.data.courses)
        const currentCourse = courses.length > 0 ? courses[0] : null
        const bookmarkedIds = items.data.user.bookmarks != null ? items.data.user.bookmarks.map(a => a.data.url) : []
        let thumb
        let stage
        if (currentCourse != null && !(items.data.courses[currentCourse] instanceof Array)) {
          thumb = items.data.courses[currentCourse].data.thumbUrls.plain
          stage = items.data.courses[currentCourse].data.intro
        }
        else {
          thumb = ''
          stage = ''
        }
        // This is basically a rewrite of the first part of getData, but
        // it needs to be done asynchronously so there's no easy way to refactor
        this.setState({
          courses : items.data.courses,
          user: items.data.user,
          bookmarkedIds: bookmarkedIds,
          currentCourse: currentCourse,
          thumb: thumb,
          stage: stage,
       })
      }
    })
    .catch(error => {
      this.setState({
        message : 'There was an error fetching your course data. Please check your network connection and try again.'
      })
    })
  }
}

// Creates a bookmark by calling the API; uses the response to update the
// state and the localStorage object
function createBookmark(url) {
  fetch('https://api.supertutortv.com/v2/courses/data/bookmarks', {
  method: 'PUT',
  accept: 'application/vnd.sttv.app+json',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      url: url
      })
  })
  .then(response => this.handleResponse(response))
  .then(items => {
    if (items !== null) {
      if (items.data && items.data.data && items.data.data.url && items.data.id) {
        let user_obj = this.state.user
        // Items.data is what the server pushes into its array; this helps keep
        // the local and remote objects in sync
        if (user_obj.bookmarks) {
          user_obj.bookmarks.push(items.data)
        }
        else {
          user_obj.bookmarks = [items.data]
        }
        const course_data = JSON.parse(localStorage.getItem('sttv_data'))
        course_data.user = user_obj
        localStorage.setItem('sttv_data', JSON.stringify(course_data))
        const bookmarkedIds = user_obj.bookmarks.map(a => a.data.url)
        this.setState({user: user_obj, bookmarkedIds: bookmarkedIds})
      }
    }
    else {
      this.setState({message: 'Could not remove that bookmark. Please try again later.'})
    }
  })
  .catch(error => {
    this.getData()
  })
}

function getIdsByUrl(url, array) {
  let matches = []
  for (let index in array) {
    let item = array[index]
    if (item.data.url == url) {
      matches.push(item.id)
    }
  }
  return matches
}

function replaceInHistory(url) {
  this.setState({loading: true})
  let id = getIdsByUrl(url, this.state.user.history)
  fetch('https://api.supertutortv.com/v2/courses/data', {
  method: 'DELETE',
  accept: 'application/vnd.sttv.app+json',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      id: id
    })
  })
  .then(response => this.handleResponse(response))
  .then(items => {
    if (items !== null) {
      let user = this.state.user
      for (let deleted in items.data) {
        for (let item in user.history) {
          if (user.history[item].id == items.data[deleted].id) {
            user.history.splice(item, 1)
          }
        }
      }
      const course_data = JSON.parse(localStorage.getItem('sttv_data'))
      course_data.user = user
      localStorage.setItem('sttv_data', JSON.stringify(course_data))
      // bookmarkedIds is in the state to efficiently set the behavior and appearance
      // of a video's bookmark icon when it is in the stage; otherwise, this would have
      // to be done on each video change. Not pretty, I am aware.
      this.setState({user: user, loading: false})
      let id = getIdsByUrl(url, this.state.user.history)
      if (id.length == 0) {
        this.addToHistory(url)
      }
      else {
        this.setState({message: 'Could not remove that bookmark. Please try again later.', loading: false})
      }
    }
    else {
      this.setState({message: 'Could not remove that bookmark. Please try again later.', loading: false})
    }
  })
  .catch(error => {
    this.setState({loading: false})
    this.getData()
  })
}

// Adds a video to the user's history by calling the API; uses the response
// to update the state and the localStorage object
function addToHistory(url) {
  let urlsInHistory = this.state.user.history.map(a => a.data.url)
  if (!(this.state.loading)) {
    if (urlsInHistory.indexOf(url) > -1) {
      this.replaceInHistory(url)
    }
    else {
      this.setState({loading: true})
      fetch('https://api.supertutortv.com/v2/courses/data/history', {
      method: 'PUT',
      accept: 'application/vnd.sttv.app+json',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          url: url
          })
      })
      .then(response => this.handleResponse(response))
      .then(items => {
        if (items != null) {
          if (items.data && items.data.data && items.data.data.url && items.data.id) {
            let user_obj = this.state.user
            if (user_obj.history) {
              user_obj.history.push(items.data)
            }
            else {
              user_obj.history = [items.data]
            }
            const course_data = JSON.parse(localStorage.getItem('sttv_data'))
            course_data.user = user_obj
            localStorage.setItem('sttv_data', JSON.stringify(course_data))
            this.setState({user: user_obj, loading: false})
          }
        }
        else {
          this.setState({message: 'Could not add that video to your history. Please try again later.', loading: false})
        }
      })
      .catch(error => {
        this.setState({loading: false})
        this.getData()
      })
    }
  }
}

// Updates the remote user object and then uses the response from the server
// to update the state and the localStorage object
function updateUserObj(key) {
  if (!this.state.loading) {
    this.setState({loading: true})
    const setting = this.state.key
    fetch('https://api.supertutortv.com/v2/courses/data/' + key, {
      method : 'PUT',
      accept: 'application/vnd.sttv.app+json',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.user[key])
    })
    .then(response => this.handleResponse(response))
    .then(items => {
      if (items != null) {
        let user_obj = this.state.user
        // Same thing as in createBookmark; the response is the value that gets updated.
        user_obj[key] = items.data[key]
        this.setState({user : user_obj})
        const courseData = JSON.parse(localStorage.getItem('sttv_data'))
        courseData.user = this.state.user
        localStorage.setItem('sttv_data', JSON.stringify(courseData))
      }
    })
    // Ensures that they can't accidentally spam the server by toggling settings
    .then(() => new Promise(() => setTimeout(() => this.setState({loading:false}), 300)))
    .catch(error => {
      this.setState({
        message : 'There was an error upadating your settings. Please contact STTV support if the problem persists.'
      })
    })
  }
}

function downloadTracker(path) {
  fetch('https://api.supertutortv.com/v2/courses/data/downloads', {
  method: 'PUT',
  accept: 'application/vnd.sttv.app+json',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      path: path
      })
  })
  .then(response => this.handleResponse(response))
  .then(items => {
    if (items != null) {
      this.setState({message: 'File added to your downloads history'})
    }
    else {
      this.setState({message: 'Could not add that file to your download history. Please try again.'})
    }
  })
  .catch(error => {
    void(0)
  })
}

function submitPracticeTest(name) {
  fetch('https://api.supertutortv.com/v2/courses/practice', {
  method: 'POST',
  accept: 'application/vnd.sttv.app+json',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: name,
    timestamp: Date(),
    missed: this.state.missed.split(',').filter(Boolean),
    blank: this.state.blank.split(',').filter(Boolean),
    guessed: this.state.guessed.split(',').filter(Boolean)
      })
  })
  .then(response => this.handleResponse(response))
  .then(items => console.log(items))
  .catch(error => {
    void(0)
    }
  )
}


// Clears the course data in localstorage and fetches new data from the API.
// Not as scary as it pretends.
function courseRefresh() {
  if (confirm("Only do this if advised by a technician at SupertutorTV, as access to your course could be broken or interrupted. Are you sure you want to proceed?")) {
    localStorage.removeItem('sttv_data')
    this.getData()
  }
}

export {addToHistory, courseRefresh, createBookmark, deleteBookmark, replaceInHistory, downloadTracker, getData, updateUserObj, submitPracticeTest}
