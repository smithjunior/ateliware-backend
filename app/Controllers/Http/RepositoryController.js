'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const axios = require('axios')
const Repository = use('App/Models/Repository')
const Database = use('Database')
const {
  sanitize
} = use('Validator')
/**
 * Resourceful controller for interacting with repositories
 */
class RepositoryController {
  /**
   * Show a list of all repositories.
   * GET repositories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({
    request,
    response,
    view
  }) {
    // get Language from request
    const {
      language
    } = request.all()

    // Search on database for the repositories on database by language
    const repositoriesListDatabase = await Repository.query()
      .where('language', language.toLowerCase())
      .fetch()

    // If exists in database return them
    if (repositoriesListDatabase.size()) {
      return response.json(repositoriesListDatabase)
    }

    // Rules for sanitize return payload
    const rules = {
      full_name: 'escape',
      description: 'escape'
    }

    // getGitHub repositories by api
    const githubPayload = await axios.get(`https://api.github.com/search/repositories?q=language%3A${language}&sort=stars&order=desc&page=1`)

    // Prepare list of repositories
    const repositoriesList = githubPayload.data.items.map((item) => {
      const repository = {}
      repository.name = item.name
      repository.full_name = item.full_name
      repository.html_url = item.html_url
      repository.homepage = item.homepage
      repository.private = item.private
      repository.description = item.hasOwnProperty('description') ? item.description : ''
      repository.owner_login = item.owner.login
      repository.owner_gravatar = item.owner.gravatar
      repository.owner_html_url = item.owner.html_url
      repository.open_issues = item.open_issues
      repository.creation_datetime = item.created_at
      repository.last_update_datetime = item.updated_at
      repository.language = item.language.toLowerCase()
      repository.forks_count = item.forks_count
      repository.watchers = item.watchers
      return sanitize(repository, rules)
    })

    // Bulk insert list of repositories
    const resp = await Repository.createMany(repositoriesList)

    return response.json(resp)
  }
}

module.exports = RepositoryController
