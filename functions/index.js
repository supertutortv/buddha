const functions = require('firebase-functions')
const stripe = require('stripe')(functions.config().stripe.test.secret)

exports.getCoupons = functions.https.onRequest(async (request, response) => {
  console.log(request.body)
  return true
  try {
    const coupons = await stripe.coupons.list({limit: 20})
    response.send(coupons);
  } catch (e) {
    return e
  }
})