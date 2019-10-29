'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepositorySchema extends Schema {
  up () {
    this.create('repositories', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('repositories')
  }
}

module.exports = RepositorySchema
