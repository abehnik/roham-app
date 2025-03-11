const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { get_current_ip } = require('./network')
const { init_routes } = require('./routes')
const { log } = require('./logger')

require('dotenv').config()

var app = express()

// set cors
app.use(cors())

app.use(express.static('public'))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use(fileUpload())

app.set('trust proxy', 1)

const BASE_PORT = process.env.BASE_PORT

async function start () {
  var current_ip = await get_current_ip()

  await init_routes(app)

  app.listen(
    BASE_PORT,
    //current_ip,
    async () => {
      log(`app server started at http://${current_ip}:${BASE_PORT};`, 'info')
    }
  )
}

start()
