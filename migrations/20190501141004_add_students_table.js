// implement changes to the schema
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', tbl => {
    // every table needs a primary key.
    tbl.increments();

    tbl
        .string('name', 128)
        .notNullable()
        .unique();
    
    tbl
        .integer('cohort_id')
        .notNullable()
        .references('id')
        .inTable('cohorts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

    tbl.timestamps(true, true);
  })
};

//undo the changes
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
