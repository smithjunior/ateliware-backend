'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepositorySchema extends Schema {
  up() {
    this.create('repositories', (table) => {
      table.bigIncrements()
      table.string('name')
      table.string('full_name').unique()
      table.string('html_url').unique()
      table.string('homepage')
      table.bool('private')
      table.string('description')
      table.string('owner_login')
      table.string('owner_gravatar')
      table.string('owner_html_url')
      table.string('license_key')
      table.string('license_url')
      table.string('open_issues')
      table.datetime('creation_datetime')
      table.datetime('last_update_datetime')
      table.string('language')
      table.integer('forks_count')
      table.string('watchers')
      table.timestamps()
    })
  }

  down() {
    this.drop('repositories')
  }
}

module.exports = RepositorySchema
