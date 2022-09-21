const { promises: fs } = require('fs')
const { join, map } = require('lodash')
const { camelCase, split, snakeCase } = require('lodash/string')
const path = require('path')
const replace = require('replace-in-file')
const { chalk, pathExists } = require('../../utils')

const generateInstancePrefixedName = (instanceName) => {
  const instanceNames = split(snakeCase(instanceName), '_')
  return join(map(instanceNames, (str) => str.substring(0, 3)), '_')
}

const createModel = async (options) => {
  try {
    const fileName = `${camelCase(options.instanceName)}.js`
    const destinyPath = `./src/database/models`
    const destinyFile = path.join(destinyPath, fileName)

    const destinyPathExists = await pathExists(destinyPath)

    if (destinyPathExists) {
      const filePathExists = await pathExists(destinyFile)
      if (filePathExists) return
    }
    
    await fs.mkdir(destinyPath, { recursive: true })
  
    await fs.copyFile(path.join(__dirname, '../../models', 'model.js'), destinyFile)

    await replace({
      files: destinyFile,
      from: [/Instance/g, /instancePrefixed/g, /moduleName/g],
      to: [options.instanceName, generateInstancePrefixedName(options.instanceName), camelCase(options.module)],
    })
    chalk.success('Model file created successfully')
  } catch (error) {
    chalk.error('Error')
    console.log(error)
  }
}

module.exports = createModel