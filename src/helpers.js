const db = require('./db')
/**
 * بازیابی تنظمات با نام
 * @param {any} config_name
 * @returns
 */
exports.get_config = async config_name => {
  var config = await db.execute_single(
    `select id,name,value from configs where name = :name`,
    {
      name: config_name
    }
  )
  return config.value
}

/**
 * بازیابی صفحه با آدرس و زبان
 * @param {*} page_lang 
 * @param {*} page_url 
 * @returns 
 */
exports.get_page_by_url = async (page_lang, page_url) => {
  return await db.execute_single(
    `select p.id,p.url,p.title,p.type,p.content as page_content,
                                l.content as layout_content,
                                a.url as app_url,a.id as app_id,a.title as app_title
                    from pages p 
					inner join apps a on a.id = p.app_id
                    inner join languages lang on lang.id = p.language_id
                    left join layouts l on l.id = p.layout_id
                    where a.url = :app_url and lang.name = :page_lang`,
    {
      page_lang: page_lang,
      page_url: page_url
    }
  )
}
