import 'babel-polyfill'
import bodyParser from 'body-parser'

// Fast, unopinionated, minimalist web framework for Node.js
// https://expressjs.com/en/4x/api.html
import express from 'express'

// Minimal Templating on Steroids
// http://handlebarsjs.com/
import exphbs from 'express-handlebars'

import logger from 'morgan'

// import our routes
import {
  api,
  pages
} from './routes'

// create express application
const app = express()

// configure express to parse JSON
app.use(bodyParser.json())

// view engine setup
app.engine('.hbs', exphbs({
  // handlebars templates use the .hbs file extension
  extname: '.hbs',
  // render within views/layouts/main.hbs
  defaultLayout: 'main'
}))
app.set('view engine', '.hbs')

// log HTTP requests to terminal
app.use(logger('dev'))
// serve static assets from 'public' directory
app.use(express.static('public'))
// there's probably a better way to handle this...
app.use('/styles', express.static('node_modules/normalize.css'))

// use our routes
app.use('/', pages)
app.use('/api', api)

// start HTTP server on port 3000
app.listen(3000, () => {
  // do it!
  console.log('Listening on http://localhost:3000/')
})
