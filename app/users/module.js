const db = require('../database/db')
const metautil = require('metautil')
const UsersController = require('./controller')
const UsersService = require('./service')

module.exports = {
  imports: [db, metautil],
  providers: [UsersService],
  controller: UsersController
}
