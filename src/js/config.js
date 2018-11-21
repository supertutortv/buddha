export default {
    env : 'production',
    production : {
        stripe : {
            publicKey : 'pk_live_ns71ckv2wHyLaP7CCyxp3DS7'
        }
    },
    development : {
        stripe : {
            publicKey : 'pk_test_aF7R0He4Yt4OYgAq3iERimgn'
        }
    }
}