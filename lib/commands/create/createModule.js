const { chalk } = require('../../utils')
const createTable = require('../migrations/createTable')
const updateModelIndex = require('../update/updateModelIndex')
const createController = require('./createController')
const createModel = require('./createModel')
const createRoutes = require('./createRoutes')
const createSchema = require('./createSchema')
const createService = require('./createService')

const createModule = async (options) => {
  try {
    await createTable(options)
    await createModel(options)
    await updateModelIndex(options)
    await createRoutes(options)
    await createSchema(options)
    await createController(options)
    await createService(options)
    chalk.success('Module created successfully')
  } catch (error) {
    chalk.error('Error')
    console.log(error)
  }
}

module.exports = createModule