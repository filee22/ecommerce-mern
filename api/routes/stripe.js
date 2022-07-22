const router = require('express').Router()
// const stripe = require('stripe')(process.env.STRIPE_KEY)
// FIX NOT PICKING UP .env
const stripe = require('stripe')(
  'sk_test_51KHVrtCC25ZIC8jTciiABJnVt55UTFreCNCBqTMinGw6nkY3cw0UZUxCVVVcwKinyvTWvJHD21xW885B9GxaBrF8006EqdW20K'
)

router.post('/payment', (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'usd',
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr)
      } else {
        res.status(200).json(stripeRes)
      }
    }
  )
})

module.exports = router
