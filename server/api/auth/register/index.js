const router = require('express-promise-router')(),
  { valBody, hashPassword } = require('./middleware'),
  { addAdmin } = require('./model'),
  { generateToken } = require('../authTools')

module.exports = router

router.post('/', valBody, hashPassword, async (req, res) => {
  const user = await addAdmin(req.body)
  const token = generateToken(user)
  res.status(201).json({
    message: `${user.first_name} successfully created!`,
    token: token,
  })
})

router.use((err, req, res, next) =>
  res.status(500).json({
    message: 'Registration Failure',
    error: err.message.replace(/\\/g, ''),
    token: false,
  })
)