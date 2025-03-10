const pages = require('./pages')
const apis = require('./apis')
const files = require('./files')
const middlewares = require('./middlewares');

exports.init = async app => {
  app.get('/', (req, res) => {
    res.redirect('/fa/home')
  })

  app.get(
    '/:page_lang(fa|en|ar)/:page_url/:page_param1?/:page_param2?/:page_param3?',
    middlewares.current_user,
    pages.render
  )

  app.post('/api/:api_url', 
    middlewares.current_user,
    apis.render)

  app.get('/api/files/:file_id',
    files.show_file
  )
}
