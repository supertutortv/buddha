export default {
    get loading() {
        return this._state.loading
    },
    set loading(val) {
        this._state.loading = val
        console.log(_st.ROOT)
        document.getElementById('stApp').classList.toggle('loading',this._state.loading)
    }
}