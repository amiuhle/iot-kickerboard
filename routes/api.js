import {
  Router
} from 'express'

import Knex from 'knex'
import { development } from '../knexfile'

const knex = Knex(development)
const router = Router()

async function debugAndInsert (query) {
  console.log(`\n\nQuery: ${query.toString()}\nResult:`)

  const result = await query

  console.table(result)
  console.log('')

  return result
}

router.post('/shots', async (req, res) => {
  try {
    console.log('POST /shots', req.body)

    // read values from request
    const shooter = req.body.shooter
    const target = req.body.target

    // create INSERT query to add new shot
    const query = knex('shots').insert({
      shooter_id: shooter,
      target_id: target
    })

    // execute and print query to console
    const result = await debugAndInsert(query)

    // give the id of the created shot to the client
    res.send(201, {
      shot_id: result[0]
    })
  } catch (ex) {
    res.status(500).send({
      error: ex.toString()
    })
  }
})

export default router
