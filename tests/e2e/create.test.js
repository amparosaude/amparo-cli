const execa = require('execa')
const { camelCase, kebabCase } = require('lodash/string')
const rimraf = require('rimraf')
const { pathExists } = require('../../lib/utils')
const { promises: fs } = require('fs')

const instanceName = 'Test'
const moduleName = 'public'
const baseModulePath = `${__dirname}/../../src/modules/${moduleName}/${camelCase(instanceName)}`

test('should create a model file', async () => {
  const filePath = `${__dirname}/../../src/database/models/${camelCase(instanceName)}.js`

  await execa(`amparo-cli create-model -i "${instanceName}" -m "${moduleName}"`)

  const fileExists = await pathExists(filePath)

  expect(fileExists).toBe(true)
})

test('should create a routes file', async () => {
  const filePath = `${baseModulePath}/routes.js`

  await execa(`amparo-cli create-route -i "${instanceName}" -m "${moduleName}"`)

  const fileExists = await pathExists(filePath)

  expect(fileExists).toBe(true)
})

test('should create a schema file', async () => {
  const filePath = `${baseModulePath}/schema.js`

  await execa(`amparo-cli create-schema -i "${instanceName}" -m "${moduleName}"`)

  const fileExists = await pathExists(filePath)

  expect(fileExists).toBe(true)
})

test('should create a controller file', async () => {
  const filePath = `${baseModulePath}/controller.js`

  await execa(`amparo-cli create-controller -i "${instanceName}" -m "${moduleName}"`)

  const fileExists = await pathExists(filePath)

  expect(fileExists).toBe(true)
})

test('should create a service file', async () => {
  const filePath = `${baseModulePath}/service.js`

  await execa(`amparo-cli create-service -i "${instanceName}" -m "${moduleName}"`)

  const fileExists = await pathExists(filePath)

  expect(fileExists).toBe(true)
})

test('should create a module', async () => {
  rimraf.sync(`${__dirname}/../../src`)

  const migrationPath = `${__dirname}/../../src/database/migrations`
  const modelPath = `${__dirname}/../../src/database/models/${camelCase(instanceName)}.js`
  const routePath = `${baseModulePath}/routes.js`
  const schemaPath = `${baseModulePath}/schema.js`
  const controllerPath = `${baseModulePath}/controller.js`
  const servicePath = `${baseModulePath}/service.js`
  
  await execa(`amparo-cli create-module -i "${instanceName}" -m "${moduleName}"`)

  const migrationFiles = await fs.readdir(migrationPath)
  expect(migrationFiles[0]).toMatch(new RegExp(`.*-create-${kebabCase(instanceName)}.js`))

  const modelExists = await pathExists(modelPath)
  expect(modelExists).toBe(true)
  
  const routeExists = await pathExists(routePath)
  expect(routeExists).toBe(true)
  
  const schemaExists = await pathExists(schemaPath)
  expect(schemaExists).toBe(true)
  
  const controllerExists = await pathExists(controllerPath)
  expect(controllerExists).toBe(true)
  
  const serviceExists = await pathExists(servicePath)
  expect(serviceExists).toBe(true)
})

afterAll(() => {
  rimraf(`${__dirname}/../../src`, () => {})
})