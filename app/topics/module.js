const { io } = require('../../lib/server')
const db = require('../database/db')
const TopicsService = require('./service')
const TopicsController = require('./controller')

module.exports = {
  imports: [db, io],
  providers: [TopicsService],
  controller: TopicsController
}
