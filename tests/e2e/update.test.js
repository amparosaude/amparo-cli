const execa = require('execa')
const { startCase } = require('lodash/string')
const rimraf = require('rimraf')
const findInFiles = require('find-in-files')

test('should add a route', async () => {
  const instance = 'Test'
  const module = 'public'
  const httpMethod = 'patch'
  const url = 'edit'
  const methodName = 'editTest'
  const filesPath = `${__dirname}/../../src/modules/${module}/${instance}`
  
  await execa(`amparo-cli create-module -i "${instance}" -m "${module}"`)
  await execa(`amparo-cli add-route -url "${url}" -mn "${methodName}" -hm "${httpMethod}" -i "${instance}" -m "${module}"`)

  const routesChanges = await findInFiles.find(new RegExp(`\.${httpMethod}\.\('${url}'.*\)`), filesPath, 'routes.js')
  expect(Object.values(routesChanges)[0].count).toBe(1)

  const controllerChanges = await findInFiles.find(new RegExp(`const ${url}${startCase(instance)} =.*`), filesPath, 'controller.js')
  expect(Object.values(controllerChanges)[0].count).toBe(1)

  const serviceChanges = await findInFiles.find(new RegExp(`const ${methodName} = async .*`), filesPath, 'service.js')
  expect(Object.values(serviceChanges)[0].count).toBe(1)
})

afterAll(() => {
  rimraf(`${__dirname}/../../src/`, () => {})
})