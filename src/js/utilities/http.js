export default class Http {
    constructor(api) {
        this.api = api
    }

    async request(route = '/',obj = {}) {
        var {method,data} = obj,
            atts = {
                method: method || 'GET',
                accept: 'application/vnd.sttv.app+json,application/octet-stream',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        if (atts.method !== 'GET') atts['body'] = JSON.stringify(data || {})
        const response = await fetch(this.api+route, atts)
        const d = await response.json()
        return d
    }

    async get(rt,cb) {
        return this.request(rt)
            .then(d => typeof cb === 'function' && cb(d))
            .catch(error => {
                alert('There was an error. Please try again later.')
                console.log(error)
            })
    }

    async post(rt,data,cb) {
        return this.request(rt,{method:'POST',data:data})
            .then(d => typeof cb === 'function' && cb(d))
            .catch(error => {
                console.log(error)
                alert('There was an error. Please try again later.')
            })
    }
    async put(rt,data,cb) {
        return this.request(rt,{method:'PUT',data:data})
            .then(d => typeof cb === 'function' && cb(d))
            .catch(error => {
                alert('There was an error. Please try again later.')
                console.log(error)
            })
    }
    async patch(rt,data,cb) {
        return this.request(rt,{method:'PATCH',data:data})
            .then(d => typeof cb === 'function' && cb(d))
            .catch(error => {
                alert('There was an error. Please try again later.')
                console.log(error)
            })
    }
    async del(rt,data,cb) {
        return this.request(rt,{method:'DELETE',data:data})
            .then(d => typeof cb === 'function' && cb(d))
            .catch(error => {
                alert('There was an error. Please try again later.')
                console.log(error)
            })
    }
}