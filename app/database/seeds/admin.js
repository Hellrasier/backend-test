/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { hashPassword } = require('metautil')


exports.seed = async function(knex) {
  hash = await hashPassword(process.env.ADMIN_PASSWORD)
  await knex('users').insert({
    login: process.env.ADMIN_LOGIN,
    password: hash,
    role: 'admin',
    firstname: 'admin',
    surname: '',
    department: 'IT'
  }).onConflict().merge()
};
