const pages = require('./pages')
const apis = require('./apis')

exports.init = async app => {
  app.get('/', (req, res) => {
    res.redirect('/fa/home')
  })

  app.get(
    '/:page_lang(fa|en|ar)/:page_url/:page_param1?/:page_param2?/:page_param3?',
    pages.render
  )

  app.post('/api/:api_url', apis.render)
}
