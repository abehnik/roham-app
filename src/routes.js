const { render_page } = require('./pages')
const { render_api } = require('./apis')
const { show_file, upload_file } = require('./files')
const { current_user } = require('./middlewares')
const { login_local, login_ldap, logout } = require('./users')

exports.init_routes = async app => {
  app.get('/', (req, res) => {
    res.redirect('/fa/home')
  })

  app.get(
    '/:page_lang(fa|en|ar)/:page_url/:page_param1?/:page_param2?/:page_param3?',
    current_user,
    render_page
  )

  app.get('/api/files/:file_id', show_file)
  app.post('/api/files/upload', current_user, upload_file)

  app.post('/api/users/login-local', login_local)
  app.post('/api/users/login-ldap', login_ldap)
  app.post('/api/users/logout', logout)

  app.post('/api/:api_url', current_user, render_api)
}
