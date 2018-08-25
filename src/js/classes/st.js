import loading from './modules/loading'

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

export const env = {
    root : 'https://courses.supertutortv.com',
    api : 'https://api.supertutortv.com/v2'
}

export { loading }
