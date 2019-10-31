'use strict'

const {
  test,
  trait
} = use('Test/Suite')('Repository')

const Repository = use('App/Models/Repository')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('get list of repositories from database', async ({
  client
}) => {
  const language = 'java'
  await Repository.create({
    creation_datetime: '2010-02-08T13:20:56Z',
    description: 'Open Source, Distributed, RESTful Search Engine',
    forks_count: 15186,
    full_name: 'elastic/elasticsearch',
    homepage: 'https://www.elastic.co/products/elasticsearch',
    html_url: 'https://github.com/elastic/elasticsearch',
    language: 'java',
    last_update_datetime: '2019-10-30T01:16:28Z',
    name: 'elasticsearch',
    open_issues: '2230',
    owner_gravatar: null,
    owner_html_url: 'https://github.com/elastic',
    owner_login: 'elastic',
    private: 0,
    watchers: 45081
  })

  const response = await client.get(`/repositories?language=${language}`).end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    creation_datetime: '2010-02-08T13:20:56Z',
    description: 'Open Source, Distributed, RESTful Search Engine',
    forks_count: 15186,
    full_name: 'elastic/elasticsearch',
    homepage: 'https://www.elastic.co/products/elasticsearch',
    html_url: 'https://github.com/elastic/elasticsearch',
    language: 'java',
    last_update_datetime: '2019-10-30T01:16:28Z',
    name: 'elasticsearch',
    open_issues: '2230',
    owner_gravatar: null,
    owner_html_url: 'https://github.com/elastic',
    owner_login: 'elastic',
    private: 0,
    watchers: 45081
  }])
})

test('get repository by id', async ({
  client
}) => {

  const repository = await Repository.create({
    creation_datetime: '2010-02-08T13:20:56Z',
    description: 'Open Source, Distributed, RESTful Search Engine',
    forks_count: 15186,
    full_name: 'elastic/elasticsearch',
    homepage: 'https://www.elastic.co/products/elasticsearch',
    html_url: 'https://github.com/elastic/elasticsearch',
    language: 'java',
    last_update_datetime: '2019-10-30T01:16:28Z',
    name: 'elasticsearch',
    open_issues: '2230',
    owner_gravatar: null,
    owner_html_url: 'https://github.com/elastic',
    owner_login: 'elastic',
    private: 0,
    watchers: 45081
  })

  const response = await client.get(`/repositories/${repository.id}`).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    creation_datetime: '2010-02-08T13:20:56Z',
    description: 'Open Source, Distributed, RESTful Search Engine',
    forks_count: 15186,
    full_name: 'elastic/elasticsearch',
    homepage: 'https://www.elastic.co/products/elasticsearch',
    html_url: 'https://github.com/elastic/elasticsearch',
    language: 'java',
    last_update_datetime: '2019-10-30T01:16:28Z',
    name: 'elasticsearch',
    open_issues: '2230',
    owner_gravatar: null,
    owner_html_url: 'https://github.com/elastic',
    owner_login: 'elastic',
    private: 0,
    watchers: 45081
  })
})


test('Wrong param on get repository', async ({
  client
}) => {

  const response = await client.get(`/repositories/ABC`).end()

  response.assertStatus(400)
})

test('Cannot find repositories on github', async ({
  client
}) => {
  const language = 'test'

  const response = await client.get(`/repositories?language=${language}`).end()

  response.assertStatus(500)
})
