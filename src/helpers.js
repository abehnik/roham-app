const { execute, execute_single } = require('./db')

/**
 * لیست تمام سیستم ها
 * @returns
 */
exports.get_apps = async () => {
  return await execute(
    `select id,title,url,is_active 
    from apps 
    order by id desc;`
  )
}

/**
 * بازیابی تنظمات با نام
 * @param {any} config_name
 * @returns
 */
exports.get_config = async config_name => {
  var config = await execute_single(
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
  return await execute_single(
    `select p.id,p.url,p.title,p.type,p.content as page_content,p.is_protected,
                                l.content as layout_content,
                                a.url as app_url,a.id as app_id,a.title as app_title
                    from pages p 
					inner join apps a on a.id = p.app_id
                    inner join languages lang on lang.id = p.language_id
                    left join layouts l on l.id = p.layout_id
                    where lang.name = :page_lang and p.url = :page_url`,
    {
      page_lang: page_lang,
      page_url: page_url
    }
  )
}

/**
 * بازیابی نقش با آی دی
 * @param {*} role_id
 * @returns
 */
exports.get_role_by_id = async role_id => {
  return await execute_single(`select * from roles where id = :role_id;`, {
    role_id: role_id
  })
}

/**
 * بازیابی api با آدرس
 * @param {*} api_url
 * @returns
 */
exports.get_api_by_url = async api_url => {
  return await execute_single(
    `select q.id,q.content,q.is_public,q.is_multiple_result,q.is_query,q.type,
        a.title as app_title,a.id as app_id,a.url as app_url
        from apis q
        inner join apps a on a.id = q.app_id
        where q.url=:api_url`,
    {
      query_url: api_url
    }
  )
}

/**
 * بازیابی فایل با آی دی
 * @param {*} file_id
 * @returns
 */
exports.get_file_by_id = async file_id => {
  return await execute_single('select * from files where id = :id', {
    id: file_id
  })
}

/**
 * بازیابی کاربر با نام کاربری
 * @param {*} user_name
 * @returns
 */
exports.get_user_by_user_name = async user_name => {
  return await execute_single(
    `select id,role_id,unit_id,user_name,salt,hashed_password,is_active
    from users
    where user_name = :user_name;`,
    {
      user_name
    }
  )
}

/**
 * بازیابی دسترسی نقش به منو api
 * @param {*} role_id 
 * @param {*} api_url 
 * @returns 
 */
exports.get_role_menu_api_by_url = async (role_id, api_url) => {
  return await db.execute_single(
    `SELECT
      rq.role_id,
      q.id as api_id
    FROM
      role_menu_apis rq
      inner join menu_apis mq on mq.id = rq.menu_api_id
      INNER JOIN apis q ON q.id = mq.api_id
    WHERE
      rq.role_id = :role_id
      AND q.url = :api_url;`,
    {
      role_id,
      api_url
    }
  )
}
