const replace = require('replace-in-file')
const chalk = require('./chalk')
const pathExists = require('./pathExists')

const updateFile = async ({
  destinyPath,
  replaceOptions,
}) => {
  try {
    const destinyPathExists = await pathExists(destinyPath)

    if (!destinyPathExists) return

    await replace({
      ...replaceOptions,
      files: destinyPath,
    })
    chalk.success('File updated successfully')
  } catch (error) {
    chalk.error('Error')
    console.log(error)
  }
}

module.exports = updateFile