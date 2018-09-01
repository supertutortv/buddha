import { post } from './http'

export default {
    verify : async (cb) => post('/auth/verify',{},cb),
    token : (dt,cb) => post('/auth/token',dt,cb),
    logout : (cb) => post('/auth/logout',{},cb)
}