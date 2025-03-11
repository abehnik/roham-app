const { get_file_by_id, create_file } = require('./helpers')
var stream = require('stream')

/**
 * نمایش قایل
 * @param {*} req
 * @param {*} res
 */
exports.show_file = async (req, res) => {
  var file_id = req.params.file_id

  var file = await get_file_by_id(file_id)

  if (file !== null) {
    var fileContents = Buffer.from(file.content, 'base64')

    var readStream = new stream.PassThrough()
    readStream.end(fileContents)

    res.set('Content-disposition', 'attachment; filename=' + file.name)
    res.set('Content-Type', file.type)

    readStream.pipe(res)
  } else res.status(404).send('فایلی با این مشخصات یافت نشد!')
}

/**
 * بارگذاری فایل
 * @param {*} req
 * @param {*} res
 */
exports.upload_file = async (req, res) => {
  var file = req.files.files
  res.send({
    code: 200,
    data: await create_file({
      file_name: file.name,
      file_type: file.mimetype,
      file_size: file.size,
      file_content: file.data
    })
  })
}
