
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  // USING TRUNCATE INSTEAD OF DELETE**
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Jamie', cohort_id: 1},
        {name: 'David', cohort_id: 1},
        {name: 'Patrick', cohort_id: 2},
        {name: 'Austin', cohort_id: 2},
        {name: 'William', cohort_id: 2},
        {name: 'Tenzing', cohort_id: 2},
        {name: 'Matt', cohort_id: 2},
        {name: 'Random Student 1', cohort_id: 3},
        {name: 'Random Student 2', cohort_id: 3},
        {name: 'Random Student 3', cohort_id: 3},
        {name: 'Random Student 4', cohort_id: 4},
        {name: 'Random Student 5', cohort_id: 4},
        {name: 'Random Student 6', cohort_id: 4}
      ]);
    });
};
