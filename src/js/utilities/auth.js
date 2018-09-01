import { post } from './http'

export default {
    verify : async (cb) => {
        await post('https://api.supertutortv.com/v2/auth/verify',{},cb)
        return null
    },
    token : (dt,cb) => post('https://api.supertutortv.com/v2/auth/token',dt,cb),
    logout : (cb) => post('https://api.supertutortv.com/v2/auth/logout',{},cb)
}