import loading from './modules/loading'
import {request,get,post,put,patch,del} from './modules/http'
import * as form from './modules/form'

const config = {
    env : 'staging',
    production : {
        stripe : {
            publicKey : 'pk_live_ns71ckv2wHyLaP7CCyxp3DS7'
        }
    },
    staging : {
        stripe : {
            publicKey : 'pk_test_aF7R0He4Yt4OYgAq3iERimgn'
        }
    },
    development : {
        stripe : {
            publicKey : 'pk_test_aF7R0He4Yt4OYgAq3iERimgn'
        }
    }
}

export const stripe = config[config.env].stripe

export const plans = new Proxy({
    'the-best-act-prep-course-ever|1206420': {
        id: '1206420',
        name: 'The Best ACT Prep Course Ever',
        price: 24900,
        taxable: 2490
    },
    'the-best-sat-prep-course-ever|12b1280': {
        id: '12b1280',
        name: 'The Best SAT Prep Course Ever',
        price: 24900,
        taxable: 0
    },
    'sat-act-bundle|12c9920': {
        id: '12b1280',
        name: 'SAT and ACT Prep Course Bundle',
        price: 39900,
        taxable: 2490
    },
}, {
    get: function(target, property, receiver) {
        for (let k in target)
            if (new RegExp(k).test(property))
                return target[k]
        return null
    }
})

export const env = {
    root : 'https://courses.supertutortv.com',
    api : 'https://api.supertutortv.com/v2'
}

export const auth = {
    verify : (cb) => post('https://api.supertutortv.com/v2/auth/verify',{},cb),
    token : (dt,cb) => post('https://api.supertutortv.com/v2/auth/token',dt,cb),
    logout : (cb) => post('https://api.supertutortv.com/v2/auth/logout',{},cb)
}

export const bodyClass = (cls = '') => document.body.classList.toggle(cls)

export const objectifyURLParams = (params = '?void=0') => params.slice(1).split('&').map(p => p.split('=')).reduce((obj, pair) => {
  const [key, value] = pair.map(decodeURIComponent);
  return ({ ...obj, [key]: value })
}, {});

export { loading, request, get, post, put, patch, del, form }
