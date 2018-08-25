import config from '../utilities/config'
import loading from './modules/loading'

export const stripe = config[config.env].stripe

export const env = {
    root : 'https://courses.supertutortv.com',
    api : 'https://api.supertutortv.com/v2'
}

export { loading }
