export default loading = (tf = true) => {
    let stApp = document.getElementById('stApp')
    return tf ? stApp.classList.add('loading') : stApp.classList.remove('loading')
}