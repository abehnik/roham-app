const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { get_current_ip } = require('./network')
const { init_routes } = require('./routes')
const { log } = require('./logger')
const { rateLimit } = require('express-rate-limit')

require('dotenv').config()

var app = express()

// set cors
app.use(cors())

// rate limiter
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    limit: 1000, // Limit each IP to 1000 requests per `window` (here, per 1 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    message: async (req, res) => {
      return 'You can only make 1000 requests every hour.'
    }
  })
)

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
