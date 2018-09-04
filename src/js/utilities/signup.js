import { post } from './http'

export default {
    account : (dt,cb) => post('/signup/account',dt,cb),
    pay : (dt,cb) => post('/signup/pay',dt,cb)
}