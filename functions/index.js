const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().stripe.test.secret);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.getCoupons = functions.https.onRequest(async (request, response) => {
  const coupons = await stripe.coupons.list((err,cpns) => cpns)
  response.send(coupons);
});
