const { render_page } = require('./pages')
const { render_api } = require('./apis')
const { show_file } = require('./files')
const { current_user } = require('./middlewares')

exports.init_routes = async app => {
  app.get('/', (req, res) => {
    res.redirect('/fa/home')
  })

  app.get(
    '/:page_lang(fa|en|ar)/:page_url/:page_param1?/:page_param2?/:page_param3?',
    current_user,
    render_page
  )

  app.post('/api/:api_url', current_user, render_api)

  app.get('/api/files/:file_id', show_file)
}
