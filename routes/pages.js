import 'console.table'

// A SQL Query Builder for Javascript
// http://knexjs.org/
import Knex from 'knex'
import { development } from '../knexfile'

import {
  Router
} from 'express'

/**
 * Helper function to execute and return a knex query,
 * logging query and result to the console.
 */
async function debugAndFetch (query) {
  console.log(`\n\nQuery: ${query.toString()}\nResult:`)

  const result = await query

  console.table(result)
  console.log('')

  return result
}

// set up database connection
const knex = Knex(development)

const router = Router()

router.get('/', (req, res) => {
  // render views/index.hbs
  res.render('index')
})

router.get('/teams', async (req, res) => {
  // build database query, fetching all teams
  const query = knex.select('*').from('teams')

  // execute the query
  const teams = await debugAndFetch(query)

  // render views/teams.hbs
  res.render('teams', {
    // pass teams to view to display them
    teams
  })
})

router.get('/shots', async (req, res) => {
  const query = knex.select('*').from('shots')

  let shots = await debugAndFetch(query)

  // make raw data presentable
  shots = shots.map((shot) => {
    const created = shot.created_at
    const shooter = shot.shooter_id
    const target = shot.target_id

    const time = new Date(created).toLocaleTimeString()

    return {
      time,
      shooter,
      target
    }
  })

  res.render('shots', {
    shots
  })
})

export default router
