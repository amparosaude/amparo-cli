const chalk = require('chalk')

const success = (params) => console.log(chalk.green(params))
const error = (params) => console.log(chalk.red(params))

const chalkOptions = {
  success,
  error,
}

module.exports = chalkOptions