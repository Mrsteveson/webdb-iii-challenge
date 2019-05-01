const express = require('express');
const helmet = require('helmet');

const server = express();
// Import routers
const cohortsRouter = require('./cohorts/cohorts-router.js');

server.use(helmet());
server.use(express.json());
// Use Router
server.use('/api/cohorts', cohortsRouter)

// Hello msg
server.get('/', (req, res) => {
    res.send({ message: 'Hello from Patty. BE Week2-Day3 Project'})
});

module.exports = server;