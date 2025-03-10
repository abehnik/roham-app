const helpers = require('./helpers')

exports.render = async (req, res) => {
  var api_url = req.params.api_url
  var current_user = req.user
  var api_params = req.body
  try {
    var api = await helpers.get_api_by_url(api_url)
    if (api !== null) {
      var api_content = api.content
      var app_id = api.app_id
      var app_url = api.app_url
      api_content = api_content.replaceAll(':app_id', app_id)
      api_content = api_content.replaceAll(':app_url', app_url)

      if (api.is_public === 0) {
      } else {
        await eval(api_content)
        var result = await execute({
          current_user,
          query_params: api_params,
          app_url,
          ip,
          io
        })
        return result
      }
    } else res.status(404).send('آدرس مورد نظر یافت نشد!')
  } catch (error) {
    console.log(error)
    return {
      code: 500,
      message: 'خطا در بارگذاری!',
      error: JSON.stringify(error)
    }
  }
}
