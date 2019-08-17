const functions = require('firebase-functions'),
  express = require('express'),
  cors = require('cors')({origin: true}),
  request = require('request'),
  stripe = require('stripe')(functions.config().stripe.test.secret)

const app = express()

const getCoupon = async (request, response) => {
  let { coupon } = request.body || ''

  const cp = await stripe.coupons.retrieve(coupon, (err,_cp) => {
    (err) ? response.send({type: 'error', data: err}) : response.send({type: 'success', data: _cp})
  })
}

app.use(cors)
app.use(getCoupon)

exports.getCoupon = functions.https.onRequest(app)