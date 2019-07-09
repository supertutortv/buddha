const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().stripe.test.secret);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.getCoupons = functions.https.onRequest(async (request, response) => {
  try {
    const coupons = await stripe.coupons.list({limit: 20});
    response.send(coupons);
  } catch (e) {
    return e;
  }
});
