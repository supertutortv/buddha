// The name says it all here. Used throughout the app
function getResourceByUrl(url) {
  try {
    const lookup = url.split('/').filter(String)
    let obj = this.state.courses
    while (true) {
      if (lookup[0] == null) {
        return(obj)
      }
      else if ('collection' in obj) {
        obj = obj.collection
      }
      else if (lookup[0] in obj) {
        obj = obj[lookup.shift()]
      }
      else {
        return null
      }
    }
  }
  catch (e) {
    return null
  }
}

// Handles changes to first-level state attributes; used throughout
function handleChange({target}) {
this.setState({
  [target.name]: target.value
  })
}

// Generic response handler for interacting with the sttv API
function handleResponse(response) {
  if (response.ok) {
    return(response.json())
  }
  else {
    if (response.status == 429) {
      this.setState({
        auth: false,
        message: 'Too many requests from this location. Please try again later.',
        username : '',
        password : ''
      })
    }
    return null
  }
}

// Replaces slashes with '>'s, capitalizes words, removes dashes, and makes ii's into II's. Keeps 'vs' lowercase.
function cleanup(string) {
  return string.replace(/\//g,' > ').replace(/\b\w/g,(x)=>(x.toUpperCase())).replace(/-/g, ' ').replace(/i(?=(i|\b))/g, 'I').replace('Vs', 'vs').replace('Act', 'ACT').replace('Sat', 'SAT')
}

export {cleanup, getResourceByUrl, handleChange, handleResponse}
