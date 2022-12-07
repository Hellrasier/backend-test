require('knex-with-relations')
const knex = require('knex')
const settings = require('./knexfile')

const db = knex(settings)

module.exports = db
