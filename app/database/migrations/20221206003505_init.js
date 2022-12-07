const db = require('../db')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
      table.increments('id')
      table.string('login').notNullable().unique()
      table.string('password').notNullable()
      table.string('firstname')
      table.string('surname')
      table.enu('role', ['admin', 'user']).notNullable()
      table.enu('department', ['administration', 'office', 'IT']),
      table.string('position')
      table.datetime('created_at').defaultTo(knex.fn.now())
    })
    .createTable('topics', table => {
      table.increments('id')
      table.string('name')
      table.string('contents', 10000)
      table.integer('author').unsigned().references('id').inTable('users')
      table.datetime('created_at').defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('topics')
};
