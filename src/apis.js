const { get_api_by_url, get_role_menu_api_by_url } = require('./helpers')
const {log} = require('./logger')

exports.render_api = async (req, res) => {
  var api_url = req.params.api_url
  var current_user = req.user
  var api_params = req.body
  try {
    var api = await get_api_by_url(api_url)
    if (api !== null) {
      var api_content = api.content
      var app_id = api.app_id
      var app_url = api.app_url
      api_content = api_content.replaceAll(':app_id', app_id)
      api_content = api_content.replaceAll(':app_url', app_url)

      if (api.is_public === 0) {
        if (current_user !== null) {
          var role_menu_api = await get_role_menu_api_by_url(
            current_user.role_id,
            api_url
          )

          if (role_menu_api === null)
            res.send({
              code: 403,
              message: `اجازه دسترسی به آدرس ${app_url}/${query_url} را ندارید!`
            })
          else {
            api_content = api_content.replaceAll(
              ':current_user_id',
              current_user.id
            )
            api_content = api_content.replaceAll(
              ':current_role_id',
              current_user.role_id
            )
            api_content = api_content.replaceAll(
              ':current_user_name',
              current_user.user_name
            )
            await eval(api_content)
            var result = await execute({
              current_user,
              query_params: api_params,
              app_url,
              ip,
              io
            })
            res.send(result)
          }
        } else res.send({ code: 401, message: 'ابتدا باید وارد سیستم شوید!' })
      } else {
        await eval(api_content)
        var result = await execute({
          current_user,
          query_params: api_params,
          app_url,
          ip,
          io
        })
        res.send(result)
      }
    } else res.send({ code: 404, message: 'آدرس مورد نظر یافت نشد!' })
  } catch (error) {
    log(error,'error')
    res.send({
      code: 500,
      message: 'خطا در بارگذاری!',
      error: JSON.stringify(error)
    })
  }
}
