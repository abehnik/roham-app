const jwt = require('jsonwebtoken')
const logger = require('./logger')
const helpers = require('./helpers')

exports.login = async (req, res) => {
  const { user_name, password } = req.body

  try {
    // Check if email and username exists and blah blah validation steps...

    var exist = await helpers.get_user_by_user_name(user_name)
    if (exist) {
      // If every validation passes, store it in the Database

      // Create a JWT Token
      const token = jwt.sign({ user_name }, process.env.ACCESS_TOKEN_SECRET)

      // Store the token in the cookie
      res.cookie('authcookie', token, { maxAge: 900000, httpOnly: false })

      res.send({ code: 200, token: token })
    } else res.send({ code: 404, message: 'کاربری با این مشخصات یافت نشد!' })
  } catch (error) {
    logger.log(error, 'error')
    res.send({ code: 500, message: 'خطا در ورود به سیستم!' })
  }
}
