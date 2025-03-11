const { get_file_by_id } = require('./helpers')
var stream = require('stream')

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
