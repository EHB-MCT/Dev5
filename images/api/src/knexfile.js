require('dotenv');

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      host: 'db',
      /* database: 'my_dev5_postgres_db',
      user: 'robbosmans',
      password: 'postgres' */
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
