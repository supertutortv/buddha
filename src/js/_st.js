import config from './config' // don't forget to scp this file to the repo on the server (DO NOT COMMIT this file)
import * as form from './utilities/form'
import * as http from './utilities/http'
import auth from './utilities/auth'
import udata from './utilities/userActions'

const plans = {
    'the-best-act-prep-course-ever': {
        id: '1206420',
        test: 'ACT',
        name: 'The Best ACT Prep Course Ever',
        price: 24900,
        taxable: 2490,
        list: [
            '*6 month* access',
            '*50+ hours* HD video',
            '*5* day FREE trial',
            '*Free* Official ACT Prep Guide'
        ]
    },
    'the-best-sat-prep-course-ever': {
        id: '12b1280',
        test: 'SAT',
        name: 'The Best SAT Prep Course Ever',
        price: 24900,
        taxable: 0,
        list: [
            '*6 month* access',
            '*50+ hours* HD video',
            '*5* day FREE trial',
            '*Free* Official SAT Study Guide'
        ]
    },
    'sat-act-bundle': {
        id: '12c9920',
        test: 'SAT & ACT',
        name: 'SAT and ACT Prep Course Bundle',
        price: 39900,
        taxable: 2490,
        list: [
            '*Full year* access',
            '*Discounted* rate',
            '*5* day FREE trial',
            '*Free* copies of both study guides'
        ]
    }
}

const objectifyURLParams = (params = '?void=0') => params.slice(1).split('&').map(p => p.split('=')).reduce((obj, pair) => {
  const [key, value] = pair.map(decodeURIComponent);
  return ({ ...obj, [key]: value })
}, {});

// FUNCTION START //

function STTV() {
    this._appStart = Math.floor(Date.now()/1000)
}

STTV.prototype = {
    stripe : config[config.env].stripe.publicKey,
    root : config[config.env].root,
    api : config[config.env].api,
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
    objectifyURLParams,
    auth,
    form,
    http,
    plans,
    udata
}

export default new STTV