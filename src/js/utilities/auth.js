import { post } from './http'

export default {
    verify : (cb) => post('/auth/verify',{},cb),
    submit : (rt = '/',dt,cb) => post(rt,dt,cb),
    logout : (cb) => post('/auth/logout',{},cb)
}