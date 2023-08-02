require('dotenv').config({path: "/Users/robbosmans/Documents/GitHub/Dev-V/.env"});

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD
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
