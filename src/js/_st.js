
/* import loading from './classes/modules/loading'
import {request,get,post,put,patch,del} from './classes/modules/http'

const auth = {
    verify : (cb) => post('https://api.supertutortv.com/v2/auth/verify',{},cb),
    token : (dt,cb) => post('https://api.supertutortv.com/v2/auth/token',dt,cb),
    logout : (cb) => post('https://api.supertutortv.com/v2/auth/logout',{},cb)
}

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

export const bodyClass = (cls = '') => document.body.className = cls

export const objectifyURLParams = (params = '?void=0') => params.slice(1).split('&').map(p => p.split('=')).reduce((obj, pair) => {
  const [key, value] = pair.map(decodeURIComponent);
  return ({ ...obj, [key]: value })
}, {});

export { loading, request, get, post, put, patch, del, form } */

import config from './config'

function _st() {
    this._lang = 'EN'
    this._loading = true
    this._bodyClass = ''
    this.stripe = config[config.env].stripe
    this.env = {
        root : 'https://courses.supertutortv.com',
        api : 'https://api.supertutortv.com/v2'
    }
    this.session = {
        loggedIn : null,
        set logIn(maybe) {this.loggedIn = !!(maybe)}
    }
    this.data = {}
}

_st.prototype = {
    testFunc1 : function() {
        console.log(this)
    },
    auth : (function(){
        var t = this
        return {
            authFunc : function() {
                console.log(t)
            }
        }
    })()
}
export default new _st