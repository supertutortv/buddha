export default {
    get bodyClass() {
        console.log(_st.STRIPE)
        return this._state.bodyClass
    },
    set bodyClass(val) {
        this._state.bodyClass = val
        let bCls = document.body.className
        if (bCls) document.body.classList.remove(...bCls.split(' '))
        document.body.classList.add(this._state.bodyClass)
    }
}