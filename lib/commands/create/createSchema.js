const { promises: fs } = require('fs')
const path = require('path')
const replace = require('replace-in-file')
const { snakeCase, camelCase } = require('lodash/string')
const { chalk, pathExists } = require('../../utils')

const FILE_NAME = 'schema.js'

const createSchema = async (options) => {
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

    await replace({
      files: destinyFile,
      from: [/instance_snake_case/g],
      to: [snakeCase(options.instanceName)],
    })

    chalk.success('Schema file created successfully')
  } catch (error) {
    chalk.error('Error')
    console.log(error)
  }
}

module.exports = createSchema