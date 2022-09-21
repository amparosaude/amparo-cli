const { promises: fs } = require('fs')
const { camelCase } = require('lodash/string')
const path = require('path')
const { chalk, pathExists } = require('../../utils')

const FILE_NAME = 'routes.js'

const createRoutes = async (options) => {
  try {
    const destinyPath = `./src/modules/${options.module}/${camelCase(options.instanceName)}`
    const destinyFile = path.join(destinyPath, FILE_NAME)

    const destinyPathExists = await pathExists(destinyPath)

    if (destinyPathExists) {
      const filePathExists = await pathExists(destinyFile)
      if (filePathExists) return
    }

    await fs.mkdir(destinyPath, { recursive: true })
    await fs.copyFile(path.join(__dirname, '../../models', FILE_NAME), destinyFile)

    chalk.success('Route file created successfully')
  } catch (error) {
    chalk.error('Error')
    console.log(error)
  }
}

module.exports = createRoutes