const db = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "car",
    timezone: "th",
  },
});

module.exports = db;
