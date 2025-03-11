const { get_page_by_url } = require('./helpers')
const { render } = require('ejs')

exports.render_page = async (req, res) => {
  var page_lang = req.params.page_lang
  var page_url = req.params.page_url
  var page_param1 = req.params.page_param1
  var page_param2 = req.params.page_param2
  var page_param3 = req.params.page_param3
  var current_user = req.user

  try {
    var page = await get_page_by_url(page_lang, page_url)
    if (page !== null) {
      if (page.is_protected === true) {
        console.log(current_user)
        if (current_user === null || current_user === undefined)
          res.status(403).send(`دسترسی به این صفحه ندارید!`)
      }
      var page_type = page.type
      var layout_content = ''

      if (page.layout_content !== null) {
        layout_content = page.layout_content.replace(
          '<page-title></page-title>',
          `<title>${page.title}</title>`
        )
        layout_content = layout_content.replace(
          '<page-body></page-body>',
          page.page_content
        )
      } else layout_content = page.page_content

      var html = render(layout_content, {
        page_title: page.title,
        page_url: page.url,
        page_icon: page.icon,
        page_params: {
          page_param1,
          page_param2,
          page_param3
        },
        page_data: null,
        app_url: page.app_url,
        app_id: page.app_id,
        app_title: page.app_title,
        current_user
      })

      var content_type = ''
      switch (page_type) {
        case 0:
          content_type = 'text/html'
          break
        case 1:
          content_type = 'application/javascript'
          break
        case 2:
          content_type = 'text/css'
          break
      }
      res.set('Content-type', content_type).send(html)
    } else res.status(404).send('آدرس مورد نظر یافت نشد!')
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: 'خطا در بارگذاری!',
      error: JSON.stringify(error)
    })
  }
}
