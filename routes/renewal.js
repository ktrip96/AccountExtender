const router = require('express').Router()
const User = require('../models/User')

router.post('/', async (req, res) => {
  User.findOne({ email: `${req.body.email}` }).then((user) => {
    if (user === undefined) res.status(400).json('User undefined')
    else {
      user.daysLeft = user.daysLeft + req.body.extraDays

      user
        .save()
        .then(() => res.json(user))
        .catch((err) => res.status(400).json('Error: ' + err))
    }
  })
})

module.exports = router
