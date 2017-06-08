import 'console.table'
import Intl from 'intl'

import {
  Router
} from 'express'

// A SQL Query Builder for Javascript
// http://knexjs.org/
import Knex from 'knex'
import { development } from '../knexfile'

import {
  debugAndExecute,
  computePoints
} from '../utils'

const timeFormatter = new Intl.DateTimeFormat('de', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})

// set up database connection
const knex = Knex(development)

const router = Router()

router.get('/', (req, res) => {
  res.redirect('/leaderboard')
})

router.get('/teams', async (req, res) => {
  // build database query, fetching all teams
  const query = knex.select('*').from('teams')

  // execute the query
  const teams = await debugAndExecute(query)

  // render views/teams.hbs
  res.render('teams', {
    // pass teams to view to display them
    teams
  })
})

router.get('/shots', async (req, res) => {
  const perPage = 10
  const { numberOfShots } = await knex.table('shots').count('* as numberOfShots').first()
  const firstPage = 1
  const lastPage = Math.ceil(numberOfShots / perPage)

  // read page from ?page= URL param, default to first page
  let currentPage = Number.parseInt(req.query.page, 10) || firstPage
  // page can't be < firstPage
  currentPage = Math.max(1, currentPage)
  // page can't be > lastPage
  currentPage = Math.min(lastPage, currentPage)

  const query = knex.select('shots.id', 'shots.created_at', 'shooter.name AS shooter', 'target.name AS target', 'actualHit.name as actualHit').from('shots')
    .join('teams AS shooter', 'shots.shooter_id', '=', 'shooter.id')
    .join('teams AS target', 'shots.target_id', '=', 'target.id')
    .leftJoin('teams AS actualHit', 'shots.actual_hit_id', '=', 'actualHit.id')
    .orderBy('shots.id', 'desc')
    // limit number of rows returned
    .limit(perPage)
    // starting at specified offset
    .offset((currentPage - 1) * perPage)

  let shots = await debugAndExecute(query, false)

  // make raw data presentable
  shots = shots.map((shot) => {
    const created = new Date(shot.created_at)
    const shooter = shot.shooter
    const target = shot.target
    const actualHit = shot.actualHit

    const time = timeFormatter.format(created)

    const points = computePoints(shooter, target, actualHit)

    return {
      time,
      shooter,
      target,
      actualHit: actualHit || '-',
      points: Number.isInteger(points) ? points : '?'
    }
  })

  res.render('shots', {
    firstPage,
    needsFirstPage: currentPage - 1 > firstPage,
    prevPage: currentPage - 1,
    needsPrevPage: currentPage > firstPage,
    currentPage,
    nextPage: currentPage + 1,
    needsNextPage: currentPage < lastPage,
    lastPage,
    needsLastPage: currentPage + 1 < lastPage,

    shots
  })
})

router.get('/leaderboard', async (req, res) => {
  const query = knex.select('shots.id', 'shots.created_at', 'shooter.name AS shooter', 'target.name AS target', 'actualHit.name as actualHit').from('shots')
    .join('teams AS shooter', 'shots.shooter_id', '=', 'shooter.id')
    .join('teams AS target', 'shots.target_id', '=', 'target.id')
    .join('teams AS actualHit', 'shots.actual_hit_id', '=', 'actualHit.id')

  let shots = await debugAndExecute(query)

  const teams = shots.reduce((teams, shot) => {
    // console.log('reduce', shot, teams)
    const shooter = shot.shooter
    const target = shot.target
    const actualHit = shot.actualHit

    const points = computePoints(shooter, target, actualHit)

    const teamName = shooter

    if (!teams.has(teamName)) {
      teams.set(teamName, {
        name: teamName,
        points: 0
      })
    }
    const team = teams.get(teamName)
    team.points += points

    return teams
  }, new Map())

  // http://stackoverflow.com/questions/28718641/transforming-a-javascript-iterator-into-an-array
  const leaderboard = Array.from(teams.values())

  leaderboard.sort((a, b) => b.points - a.points)

  res.render('leaderboard', {
    leaderboard
  })
})

export default router
