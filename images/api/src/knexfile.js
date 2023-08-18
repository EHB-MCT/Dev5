require('dotenv');

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      host: 'db',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_user_migrations'
    }
  }
};
