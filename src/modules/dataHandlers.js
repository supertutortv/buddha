// Deletes a bookmark from the remote object; uses the server's response to
// delete the bookmark from the state and the localStorage object
function deleteBookmark(id) {
  fetch('https://api.supertutortv.com/v2/courses/data', {
  method: 'DELETE',
  accept: 'application/vnd.sttv.app+json',
  credentials: 'include',
  headers: {
    'X-RateLimit-Buster': 'bf6ca4f90c6f5dd48c7c289f34376e12765d315eb23b81a90701e18508610f52',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      id: id
    })
  })
  .then( response => this.handleResponse(response))
  .then( items => {
    if (items !== null) {
      let user = this.state.user
      for (let item in user.bookmarks) {
        if (user.bookmarks[item].id == items.data[0].id) {
          user.bookmarks.splice(item, 1)
        }
      }
      const course_data = JSON.parse(localStorage.getItem('sttv_data'))
      course_data.user = user
      localStorage.setItem('sttv_data', JSON.stringify(course_data))
      const bookmarkedIds = user.bookmarks.map(a => a.data.url)
      this.setState({user: user, bookmarkedIds: bookmarkedIds})
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
    const current = data.user.settings.default_course
    const bookmarkedIds = data.user.bookmarks.map(a => a.data.url)
    this.setState({
      courses: data.courses,
      bookmarkedIds: bookmarkedIds,
      user: data.user,
      currentCourse: current,
      thumb: data.courses[current].data.thumbUrls.plain,
      stage: data.courses[current].data.intro,
      vids: data.user.history,
    })
  }
  else {
    fetch('https://api.supertutortv.com/v2/courses/data', {
      credentials: 'include',
      headers: {
        'X-RateLimit-Buster': 'bf6ca4f90c6f5dd48c7c289f34376e12765d315eb23b81a90701e18508610f52',
        'Content-Type': 'application/json'
      }
    })
    .then(response => this.handleResponse(response))
    .then(items => {
      if (items !== null) {
        localStorage.setItem('sttv_data', JSON.stringify(items.data))
        const currentCourse = items.data.user.settings.default_course
        const thumb = items.data.courses[currentCourse].data.thumbUrls.plain
        const stage = items.data.courses[currentCourse].data.intro
        const bookmarkedIds = items.data.user.bookmarks.map(a => a.data.url)
        // This is basically a rewrite of the first part of getData, but
        // it needs to be done asynchronously so there's no easy way to refactor
        this.setState({
          courses : items.data.courses,
          user: items.data.user,
          bookmarkedIds: bookmarkedIds,
          currentCourse: items.data.user.settings.default_course,
          thumb: thumb,
          stage: stage,
          vids: items.data.user.history,
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
    'X-RateLimit-Buster': 'bf6ca4f90c6f5dd48c7c289f34376e12765d315eb23b81a90701e18508610f52',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      url: url
      })
  })
  .then( response => this.handleResponse(response))
  .then( items => {
    if (items !== null) {
      let user = this.state.user
      user.bookmarks.push(items.data)
      const course_data = JSON.parse(localStorage.getItem('sttv_data'))
      course_data.user = user
      localStorage.setItem('sttv_data', JSON.stringify(course_data))
      const bookmarkedIds = user.bookmarks.map(a => a.data.url)
      this.setState({user: user, bookmarkedIds: bookmarkedIds})
    }
    else {
      this.setState({message: 'Could not remove that bookmark. Please try again later.'})
    }
  })
  .catch(error => {
    this.getData()
  })
}

// Updates the remote user object and then uses the response from the server
// to update the state and the localStorage object
function updateUserObj(key) {
  const setting = this.state.key
  fetch('https://api.supertutortv.com/v2/courses/data/' + key, {
    method : 'PUT',
    accept: 'application/vnd.sttv.app+json',
    credentials: 'include',
    headers: {
      'X-RateLimit-Buster': 'bf6ca4f90c6f5dd48c7c289f34376e12765d315eb23b81a90701e18508610f52',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(this.state.user[key])
  })
  .then(response => this.handleResponse(response))
  .then( items => {
    if (items !== null) {
      const user_obj = this.state.user
      user_obj[key] = items.data[key]
      this.setState({user : user_obj})
      const courseData = JSON.parse(localStorage.getItem('sttv_data'))
      courseData.user = this.state.user
      localStorage.setItem('sttv_data', JSON.stringify(courseData))
    }
  })
  .catch(error => {
    this.setState({
      message : 'There was an error upadating your settings. Please contact STTV support if the problem persists.'
    })
  })
}

// Clears the course data in localstorage and fetches new data from the API;
// updates the state and re-renders if necessary
function courseRefresh() {
  if (confirm("Only do this if advised by a technician at SupertutorTV, as access to your course could be broken or interrupted. Are you sure you want to proceed?")) {
    localStorage.removeItem('sttv_data')
    this.getData()
  }
}

export {courseRefresh, createBookmark, deleteBookmark, getData, updateUserObj}
