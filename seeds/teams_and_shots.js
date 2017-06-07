
// http://www.dfb.de/die-mannschaft/statistik/rekordtorschuetzen/?no_cache=0
var teams = [
  { id: 0, name: 'Team 0' },
  { id: 1, name: 'Team 1' },
  { id: 2, name: 'Team 2' },
  { id: 3, name: 'Team 3' },
  { id: 4, name: 'Team 4' }
]

function randomPlayer (shooter) {
  // remove shooter from targets
  const availablePlayers = teams.map(team => team.id).filter(player => player !== shooter)
  // https://stackoverflow.com/a/4550514
  const randomIndex = Math.floor(Math.random() * availablePlayers.length)
  return availablePlayers[randomIndex]
}

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('shots').del()
    .then(() => knex('teams').del())
    .then(function () {
      // Inserts seed entries
      return knex('teams').insert(teams)
    })
    .then(function () {
      const shotCount = 100
      return knex('shots').insert(
        // create an array of 100 random shots
        new Array(shotCount).fill(undefined).map((_, index) => {
          // pick a random player
          const shooter = randomPlayer()
          // pick another random player, not including shooter
          const target = randomPlayer(shooter)

          let actualHit = null
          // because of how the API works, the last shot
          // MUST have actual_hit_id = NULL
          if (index + 1 < shotCount) {
            // 80% chance of hitting
            if (Math.random() < 0.8) {
              actualHit = target
            } else {
              // if it's not a hit, pick another random player,
              // this time without target
              actualHit = randomPlayer(target)
            }
          }

          // return the shot object to insert
          return {
            shooter_id: shooter,
            target_id: target,
            actual_hit_id: actualHit
          }
        })
      )
    })
}
