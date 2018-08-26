export async function request(route = '/',...obj) {
    var {method: method,data: data} = obj,
        atts = {
            method: method || 'GET',
            accept: 'application/vnd.sttv.app+json',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log(obj)
    /* if (atts.method !== 'GET') atts['body'] = JSON.stringify(data || {})
    const response = await fetch(route, atts)
    const d = await response.json()
    return d */
}
export async function get(rt,cb) {
    return await request(rt).then(d => typeof cb === 'function' && cb(d)).catch(error => {
        console.log(error) && alert('There was an error. Please try again later.')
    })
}
export async function post(rt,data,cb) {
    return await request(rt,{method:'POST',data:data}).then(d => typeof cb === 'function' && cb(d)).catch(error => {
        console.log(error) && alert('There was an error. Please try again later.')
    })
}
export async function put(rt,data,cb) {
    return await request(rt,{method:'PUT',data:data}).then(d => typeof cb === 'function' && cb(d)).catch(error => {
        console.log(error) && alert('There was an error. Please try again later.')
    })
}
export async function patch(rt,data,cb) {
    return await request(rt,{method:'PATCH',data:data}).then(d => typeof cb === 'function' && cb(d)).catch(error => {
        console.log(error) && alert('There was an error. Please try again later.')
    })
}
export async function del(rt,data,cb) {
    return await request(rt,{method:'DELETE',data:data}).then(d => typeof cb === 'function' && cb(d)).catch(error => {
        console.log(error) && alert('There was an error. Please try again later.')
    })
}