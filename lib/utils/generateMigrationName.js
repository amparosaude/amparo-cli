const { kebabCase } = require('lodash/string')
const moment = require('moment')

const generateMigrationName = (action) => {
  const actualDate = moment().format('YYYYMMDDHHMMSS')
  return `${actualDate}-${action}`
}

const generateMigrationCreateTableName = (instance) => generateMigrationName(
  `create-${kebabCase(instance)}`,
)

module.exports = {
  generateMigrationCreateTableName,
}