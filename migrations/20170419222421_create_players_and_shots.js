
exports.up = function (knex) {
  return knex.schema
    .createTable('players', function (table) {
      table.increments('id').primary()
      table.string('name')
    })
    .createTable('shots', function (table) {
      table.increments('id').primary()
      table.integer('shooter_id').unsigned().references('id').inTable('players')
      table.integer('target_id').unsigned().references('id').inTable('players')
      table.boolean('success')
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('shots')
    .dropTableIfExists('players')
}
