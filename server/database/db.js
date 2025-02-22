const { Pool } = require('pg');
const { database } = require('pg/lib/defaults');
require('dotenv').config()

const pool = new Pool({
    user: 'read_only',
    password: 'hmphh',
    host: 'localhost',
    port: 5432,
    database: 'nightclub-sets'
});

module.exports = {
    query: (text, params) => pool.query(text, params)
}
