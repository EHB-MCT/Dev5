
//Create a table in the database
exports.up = function(knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments('id');
        table.string('name').notNullable();
        table.string('email');
        table.string('password').notNullable();
  })
};

//Drops a table from the database 
exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
