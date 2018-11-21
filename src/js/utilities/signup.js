import { get, post } from './http'

export default {
    init: (plan,cb) => get('/signup/'+plan,cb),
    account : (dt,cb) => post('/signup/account',dt,cb),
    pay : (dt,cb) => post('/signup/pay',dt,cb)
}