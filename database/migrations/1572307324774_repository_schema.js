'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepositorySchema extends Schema {
  up() {
    this.create('repositories', (table) => {
      table.increments()
      table.string('name')
      table.string('full_name')
      table.string('html_url')
      table.string('homepage')
      table.bool('private')
      table.text('description')
      table.string('owner_login')
      table.string('owner_gravatar')
      table.string('owner_html_url')
      table.string('open_issues')
      table.string('creation_datetime')
      table.string('last_update_datetime')
      table.string('language')
      table.integer('forks_count')
      table.integer('watchers')
      table.timestamps()
    })
  }

  down() {
    this.drop('repositories')
  }
}

module.exports = RepositorySchema
