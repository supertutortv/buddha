import config from './config'
import * as form from './utilities/form'
import Http from './utilities/http'
import auth from './utilities/auth'
import udata from './utilities/userActions'

const objectifyURLParams = (params = '?void=0') => params.slice(1).split('&').map(p => p.split('=')).reduce((obj, pair) => {
  const [key, value] = pair.map(decodeURIComponent);
  return ({ ...obj, [key]: value })
}, {});

const env = process.env.APP_MODE

// FUNCTION START //

function STTV() {
    this._appStart = Math.floor(Date.now()/1000)
}

STTV.prototype = {
    stripe : config[env].stripe.publicKey,
    root : config[env].root,
    api : config[env].api,
    _state : {
        lang: 'EN',
        loading: false,
        bodyClass: 'default'
    },
    get loading() {
        return this._state.loading
    },
    set loading(val) {
        this._state.loading = val
        const loader = document.querySelector('st-app').classList
        return this._state.loading ? loader.replace('active','loading') : loader.replace('loading','active')
    },
    get bodyClass() {
        return this._state.bodyClass
    },
    set bodyClass(val) {
        const v = val.split(' ')
        document.body.classList.add(...v)
        /* this._state.bodyClass = val
        let bCls = document.body.className.split(' ')
        if (bCls) document.body.classList.remove(...bCls)
         */
    },
    get loggedIn() {
        return this._state.loggedIn
    },
    set loggedIn(val) {
        this._state.loggedIn = val
        return this._state.loggedIn
    },
    objectifyURLParams,
    form,
    http: new Http(config[env].api),
    udata
}

export default new STTV