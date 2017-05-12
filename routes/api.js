import {
  Router
} from 'express'

import Knex from 'knex'
import { development } from '../knexfile'

import { debugAndExecute } from '../utils'

const knex = Knex(development)
const router = Router()

router.post('/shots', async (req, res) => {
  try {
    console.log('POST /shots', req.body)

    // read values from request
    const shooter = req.body.shooter
    const target = req.body.target

    // get the id of the last inserted shot
    const { lastShotId } = await debugAndExecute(knex('shots').orderBy('id', 'DESC').first('id AS lastShotId'))

    // set actual_hit_id of last shot to shooter

    // create INSERT query to add new shot
    const createShot = knex('shots').insert({
      shooter_id: shooter,
      target_id: target
    })

    // execute and print query to console
    const result = await debugAndExecute(createShot)

    // give the id of the created shot to the client
    res.status(201).send({
      shot_id: result[0]
    })
  } catch (ex) {
    res.status(500).send({
      error: ex.toString()
    })
  }
})

export default router
