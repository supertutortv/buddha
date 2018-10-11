import { put } from './http'

export default {
    updating: false,
    update: (action,dt,cb) => put('/courses/data/'+action,dt,cb),
    remove: (dt,cb) => del('/courses/data',dt,cb)
}