const { verify } = require('jsonwebtoken')
const { log } = require('./logger')

/**
 * واسط افزار برای چک کردن کاربر جاری
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.current_user = (req, res, next) => {
  log.log('check user', 'info')
  const authCookie =
    req.cookies !== undefined ? req.cookies['authcookie'] : null

  // If there is no cookie, return an error
  if (authCookie == null) req.user = null

  // If there is a cookie, verify it
  verify(authCookie, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // If there is an error, return an error
    if (err) req.user = null
    else req.user = user

    next()
  })
}
