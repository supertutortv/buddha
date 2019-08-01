const functions = require('firebase-functions'),
  express = require('express'),
  cors = require('cors')({origin: true}),
  request = require('request'),
  stripe = require('stripe')(functions.config().stripe.test.secret)

const app = express()

const getCoupon = async (request, response) => {
  response.send(request.body)
  /* try {
    const coupons = await stripe.coupons.list({limit: 20})
    response.send(coupons);
  } catch (e) {
    return e
  } */
}

app.use(cors)
app.use(getCoupon)

exports.getCoupon = functions.https.onRequest(getCoupon)