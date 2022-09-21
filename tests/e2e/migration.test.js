const execa = require('execa')
const { promises: fs } = require('fs')
const { kebabCase } = require('lodash/string')
const rimraf = require('rimraf')

test('should create a migration file', async () => {
  const instance = 'Test'
  const module = 'public'
  const filePath = `${__dirname}/../../src/database/migrations`

  await execa(`amparo-cli create-migration-table -i "${instance}" -m "${module}"`)

  const migrationFiles = await fs.readdir(filePath)

  expect(migrationFiles[0]).toMatch(new RegExp(`.*-create-${kebabCase(instance)}.js`))
})

afterAll(() => {
  rimraf(`${__dirname}/../../src`, () => {})
})