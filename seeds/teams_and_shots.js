
// http://www.dfb.de/die-mannschaft/statistik/rekordtorschuetzen/?no_cache=1
var teams = [
  { id: 1, name: 'Team 1' },
  { id: 2, name: 'Team 2' },
  { id: 3, name: 'Team 3' },
  { id: 4, name: 'Team 4' },
  { id: 5, name: 'Team 5' }
]

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('teams').del()
    .then(function () {
      // Inserts seed entries
      return knex('teams').insert(teams)
    }),
    knex('shots').del()
    .then(function () {
      return knex('shots').insert([
        { shooter_id: 1, target_id: 5, actual_hit_id: 4 },
        { shooter_id: 4, target_id: 5, actual_hit_id: 5 },
        { shooter_id: 5, target_id: 3, actual_hit_id: 3 },
        { shooter_id: 3, target_id: 5, actual_hit_id: 2 },
        { shooter_id: 2, target_id: 4, actual_hit_id: 1 },
        { shooter_id: 1, target_id: 2, actual_hit_id: 2 },
        { shooter_id: 2, target_id: 1, actual_hit_id: 1 },
        { shooter_id: 1, target_id: 2, actual_hit_id: 3 },
        { shooter_id: 3, target_id: 5, actual_hit_id: 5 },
        { shooter_id: 5, target_id: 1 }
      ])
    })
  ])
}
