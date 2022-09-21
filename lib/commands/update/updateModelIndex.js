const { camelCase } = require('lodash/string')
const { chalk } = require('../../utils')
const { updateFile } = require('../../utils')

const updateModelIndex = async (options) => {
  try {
    const formattedOptions = {
      ...options,
      instanceCamelCase: camelCase(options.instanceName),
    }

    await updateFile({
      destinyPath: `./src/database/models/index.js`,
      replaceOptions: {
        from: [
          /(.*require\(.*\))/gs,
          /(\nmodule.exports.*,)/gs,
        ],
        to: [
          `$1\nconst ${formattedOptions.instanceName} = require('./${formattedOptions.instanceCamelCase}')`,
          `$1\n  ${formattedOptions.instanceName},`
        ],
      },
    })

    chalk.success('Model index file updated successfully')
  } catch (error) {
    chalk.error('Error')
    console.log(error)
  }
}

module.exports = updateModelIndex