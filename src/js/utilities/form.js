export function overlay() {
    return typeof document.querySelector('.stOverlay').classList.toggle('active') === 'boolean'
}

export function setState(state,el) {
    Object.assign(state,{[el.name] : el.value})
}

export function clearError() {
    return !(document.querySelector('#stFormErrors').innerHTML = '')
}

export function printError(msg) {
    return !!(document.querySelector('#stFormErrors').innerHTML = msg)
}