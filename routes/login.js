const router = require('express').Router()
const User = require('../models/User')

// Register A New User
router.post('/', async (req, res) => {
  try {
    const { email, name } = req.body

    // validate
    if (!email || !name)
      return res
        .status(400)
        .json({ message: 'Not all fields have been entered' })

    let existingUser = await User.findOne({ email: email })

    // Αν υπάρχει, επίστρεψέ μου τις μέρες που του έχουν απομείνει
    if (existingUser)
      return res.status(200).json({ daysLeft: existingUser.daysLeft })

    // αλλιώς φτιάξε καινούργιο User

    const newUser = new User({
      email,
      name,
    })
    const savedUser = await newUser.save()
    res.json(savedUser)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
