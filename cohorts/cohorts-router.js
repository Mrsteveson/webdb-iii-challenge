const knex = require('knex');
const router = require('express').Router();

// configure knex.
const knexConfig = {
    client: 'sqlite3',
    connection: {
      filename: './data/lambda.sqlite3'
    },
    useNullAsDefault: true,
};
// use knex.
const db = knex(knexConfig);

// Endpoints. CRUD.
// Get.













module.exports = router;