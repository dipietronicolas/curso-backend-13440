require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 9000,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE: process.env.DATABASE
}