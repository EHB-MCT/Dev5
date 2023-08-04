require('dotenv').config({path: "/Users/robbosmans/Documents/GitHub/Dev-V/.env"});

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      /* database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD */
      host: 'db',
      database: 'my_dev5_postgres_db',
      user: 'robbosmans',
      password: 'postgres'
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
