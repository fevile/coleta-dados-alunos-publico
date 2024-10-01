const { Client } = require('pg');
require('dotenv').config();

const getClient = () => {
  return new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
  });
};

module.exports = getClient;
