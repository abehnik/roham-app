const { sign } = require('jsonwebtoken')
const { log } = require('./logger')
const { get_user_by_user_name } = require('./helpers')
const crypto_service = require('./crypto')
require('dotenv').config()

exports.login = async (req, res) => {
  const { user_name, password } = req.body
  var current_user = undefined

  try {
    // Check if email and username exists and blah blah validation steps...

    var user = await get_user_by_user_name(user_name)
    if (user) {
      // If every validation passes, store it in the Database
      var match = crypto_service.compare(
        password,
        user.hashed_password,
        user.salt
      )
      if (match) current_user = user

      if (current_user !== undefined) {
        // Create a JWT Token

        var token = sign(
          {
            id: current_user.id,
            user_name: current_user.user_name,
            first_name: current_user.first_name,
            last_name: current_user.last_name,
            role_title: current_user.role_title,
            role_id: current_user.role_id,
            unit_id: current_user.unit_id
          },
          process.env.TOKEN_SECRET,
          { expiresIn: process.env.TOKEN_EXPIRATIONTIME }
        )

        // Store the token in the cookie
        res.cookie('authcookie', token, { maxAge: 900000, httpOnly: false })

        res.send({
          code: 200,
          tdata: {
            user_id: current_user.id,
            user_name: current_user.user_name,
            role_name: current_user.role_title,
            token: token,
            expires_in: 86400
          }
        })
      }
    } else res.send({ code: 404, message: 'کاربری با این مشخصات یافت نشد!' })
  } catch (error) {
    log(error, 'error')
    res.send({ code: 500, message: 'خطا در ورود به سیستم!' })
  }
}
