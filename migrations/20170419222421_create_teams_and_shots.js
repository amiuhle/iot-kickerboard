
exports.up = function (knex) {
  return knex.schema
    .createTable('teams', function (table) {
      table.increments('id').primary()
      table.string('name')
      table.timestamps(true, true)
    })
    .createTable('shots', function (table) {
      table.increments('id').primary()
      table.integer('shooter_id').unsigned().references('id').inTable('teams')
      table.integer('target_id').unsigned().references('id').inTable('teams')
      table.timestamps(true, true)
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('shots')
    .dropTableIfExists('teams')
}
