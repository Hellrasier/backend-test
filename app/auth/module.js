const sessions = require('../../lib/sessions')
const db = require('../database/db')
const metautil = require('metautil')
const jwt = require('jsonwebtoken')
const AuthService = require('./service')
const AuthController = require('./controller')

module.exports = {
  imports: [sessions, db, metautil, jwt],
  providers: [AuthService],
  controller: AuthController
}
