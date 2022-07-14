const router = require('express').Router()
const User = require('../models/User')

router.post('/', async (req, res) => {
  User.findOne({ email: `${req.body.email}` }).then((user) => {
    if (user === undefined) res.status(400).json('User undefined')
    else if (user.daysLeft === 0) res.status(200).json({ daysLeft: 0 })
    else {
      user.daysLeft = user.daysLeft - 1

      user
        .save()
        .then(() => res.json(user))
        .catch((err) => res.status(400).json('Error: ' + err))
    }
  })
})

module.exports = router
