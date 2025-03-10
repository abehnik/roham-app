const helpers = require('./helpers')

exports.render = async (req, res) => {
  var page_lang = req.params.page_lang
  var page_url = req.params.page_url
  var page_param1 = req.params.page_param1
  var page_param2 = req.params.page_param2
  var page_param3 = req.params.page_param3

  var page = await helpers.get_page_by_url(page_lang, page_url)
  if (page !== null) {
    res.send(page)
  } else res.status(404).send(`صفحه ای با این مشخصات یافت نشد!`)
}
