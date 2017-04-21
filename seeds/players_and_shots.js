
// http://www.dfb.de/die-mannschaft/statistik/rekordtorschuetzen/?no_cache=1
var players = [
  { id: 1, name: 'Klose' },
  { id: 2, name: 'Müller' },
  { id: 3, name: 'Streich' },
  { id: 4, name: 'Podolski' },
  { id: 5, name: 'Klinsmann' }
]

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('players').del()
    .then(function () {
      // Inserts seed entries
      return knex('players').insert(players)
    }),
    knex('shots').del()
    .then(function () {
      return knex('shots').insert([
        { shooter_id: 1, target_id: 5, success: false },
        { shooter_id: 1, target_id: 2, success: true },
        { shooter_id: 2, target_id: 5, success: false },
        { shooter_id: 2, target_id: 1, success: true },
        { shooter_id: 3, target_id: 4 },
        { shooter_id: 3, target_id: 1, success: false },
        { shooter_id: 4, target_id: 5, success: true },
        { shooter_id: 4, target_id: 2, success: true },
        { shooter_id: 5, target_id: 3 },
        { shooter_id: 5, target_id: 1, success: true }
      ])
    })
  ])
}
