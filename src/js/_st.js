
/*

export const plans = [
    {
        id: '1206420',
        slug: 'the-best-act-prep-course-ever',
        name: 'The Best ACT Prep Course Ever',
        price: 24900,
        taxable: 2490
    },
    {
        id: '12b1280',
        slug: 'the-best-sat-prep-course-ever',
        name: 'The Best SAT Prep Course Ever',
        price: 24900,
        taxable: 0
    },
    {
        id: '12c9920',
        slug: 'sat-act-bundle',
        name: 'SAT and ACT Prep Course Bundle',
        price: 39900,
        taxable: 2490
    }
]

export const signup = {
    account : (dt,cb) => post('https://api.supertutortv.com/v2/signup/account',dt,cb),
    pay : (dt,cb) => post('https://api.supertutortv.com/v2/signup/pay',dt,cb)
}

export const bodyClass = (cls = '') => 

export const objectifyURLParams = (params = '?void=0') => params.slice(1).split('&').map(p => p.split('=')).reduce((obj, pair) => {
  const [key, value] = pair.map(decodeURIComponent);
  return ({ ...obj, [key]: value })
}, {});

export { loading, request, get, post, put, patch, del, form } */

import config from './config'
import auth from './utilities/auth'

function _st() {
    this._appStart = Math.floor(Date.now()/1000)
}

_st.prototype = {
    _state : {
        lang: 'EN',
        loading: false,
        bodyClass: 'default',
        loggedIn: null,
        data: {}
    },
    get loading() {
        return this._state.loading
    },
    set loading(val) {
        this._state.loading = val
        console.log(_st.ROOT)
        document.getElementById('stApp').classList.toggle('loading',this._state.loading)
    },
    get bodyClass() {
        return this._state.bodyClass
    },
    set bodyClass(val) {
        this._state.bodyClass = val
        let bCls = document.body.className
        if (bCls) document.body.classList.remove(...bCls.split(' '))
        document.body.classList.add(this._state.bodyClass)
    },
    get loggedIn() {
        return this._state.loggedIn
    },
    set loggedIn(val) {
        this._state.loggedIn = val
        return this._state.loggedIn
    },
    auth
}

_st.ROOT = 'https://courses.supertutortv.com'
_st.API = 'https://api.supertutortv.com/v2'
_st.STRIPE = config[config.env].stripe

export default new _st