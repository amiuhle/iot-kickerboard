import 'babel-polyfill'
import express from 'express'
import Knex from 'knex'
import { development } from './knexfile'

const app = express()

const knex = Knex(development)

// serve static assets from 'public' directory
app.use(express.static('public'))
app.use('/styles', express.static('node_modules/normalize.css'))

app.get('/hello', function (req, res) {
  res.send('Hello World!')
})

// start HTTP server on port 3000
app.listen(3000, () => {
  // do it!
  console.log('Listening on http://localhost:3000/')
})
