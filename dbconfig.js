var Pool = require('pg').Pool;

var pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'movies_database',
    password: '121212',
    port: 5432
})

module.exports = pool;