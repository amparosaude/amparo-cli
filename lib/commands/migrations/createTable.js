const { promises: fs } = require('fs')
const { camelCase } = require('lodash/string')
const path = require('path')
const replace = require('replace-in-file')
const { chalk, pathExists } = require('../../utils')
const { generateMigrationName: { generateMigrationCreateTableName } } = require('../../utils')

const createTable = async (options) => {
  try {
    const fileName = `${generateMigrationCreateTableName(options.instanceName)}.js`
    const destinyPath = `./src/database/migrations`
    const destinyFile = path.join(destinyPath, fileName)
    chalk.success(destinyFile)

    const destinyPathExists = await pathExists(destinyPath)

    if (destinyPathExists) {
      const filePathExists = await pathExists(destinyFile)
      if (filePathExists) return
    }
    
    await fs.mkdir(destinyPath, { recursive: true })
  
    await fs.copyFile(path.join(__dirname, '../../models/migrations', 'createTable.js'), destinyFile)

    await replace({
      files: destinyFile,
      from: [/Instance/g, /moduleName/g],
      to: [options.instanceName, camelCase(options.module)],
    })

    chalk.success('Migration file created successfully')
  } catch (error) {
    chalk.error('Error')
    console.log(error)
  }
}

module.exports = createTable