// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './kickerboard_development.sqlite'
    },
    useNullAsDefault: true,
    // https://github.com/tgriesser/knex/issues/453#issuecomment-54160324
    pool: {
      afterCreate: (conn, cb) => {
        conn.run('PRAGMA foreign_keys = ON', cb)
      }
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'kickerboard_staging',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'kickerboard_production',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

}
