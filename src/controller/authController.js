const router = require('express').Router()
const User = require('../models/User')

router.post('/register', async (req, res) => {
  const { username, password } = req.body
  try {
    const post = await User.create({
      username,
      password
    })
    return res.json(post)
  } catch (err) {
    return res.status(400).send({ error: 'registration failed' })
  }
})

module.exports = app => app.use('/auth', router)
