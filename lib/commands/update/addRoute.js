const { camelCase } = require('lodash/string')
const replace = require('replace-in-file')
const { chalk, pathExists } = require('../../utils')

const controllerMethod = options => `const ${options.methodName} = (req, res, next) => {
  ${options.methodName}${options.instance}(req.user, req.params.id, req.body)
    .then((${options.instanceCamelCase}) => {
      res.json(${options.instanceCamelCase})
    })
    .catch(next)
}
`

const serviceMethod = options => `const ${options.methodName} = async (user, attributes) => {
  const ${options.instanceCamelCase} = await ${options.instance}
    .scope({ method: ['accessControl', user] })
    .findOne({
      where: {
        id,
      },
    })

  await verifyIfExists(${options.instanceCamelCase})

  return ${options.instanceCamelCase}
}
`

const updateFile = async (options, fileName, replaceOptions) => {
  try {
    const destinyPath = `./src/modules/${options.module}/${camelCase(options.instance)}/${fileName}.js`

    const destinyPathExists = await pathExists(destinyPath)
    if (!destinyPathExists) return

    await replace({
      ...replaceOptions,
      files: destinyPath,
    })

    chalk.success('Route file created successfully')
  } catch (error) {
    chalk.error('Error')
    console.log(error)
  }
}

const updateRoutes = async (options) => {
  try {
    await updateFile(
      options,
      'routes',
      {
        from: [
          /(.*require\('.\/controller'\))/g,
          /(.(get|post|put|delete)\(.*\))/gms,
        ],
        to: [
          `  ${options.methodName},\n$1`,
          `$1\n  .${options.method}('${options.url}', isAuthenticated, hasAuthorization, ${options.methodName})`,
        ],
      }
    )
    chalk.success('Routes file updated successfully')
  } catch (error) {
    chalk.error('Error')
    console.log(error)
  }
}

const updateController = async (options) => {
  try {
    await updateFile(
      options,
      'controller',
      {
        from: [
          /(.*require\('.\/service'\))/g,
          /(module.exports.*)/gm,
          /(module.exports.*,)/gms,
        ],
        to: [
          `  ${options.methodName}: ${options.methodName}${options.instance},\n$1`,
          `${controllerMethod(options)}\n$1`,
          `$1\n  ${options.methodName},`,
        ],
      }
    )
    chalk.success('Controller file updated successfully')
  } catch (error) {
    chalk.error('Error')
    console.log(error)
  }
}

const updateService = async (options) => {
  try {
    await updateFile(
      options,
      'service',
      {
        from: [
          /(module.exports.*)/gm,
          /(module.exports.*,)/gms,
        ],
        to: [
          `${serviceMethod(options)}\n$1`,
          `$1\n  ${options.methodName},`
        ],
      }
    )
    chalk.success('Controller file updated successfully')
  } catch (error) {
    chalk.error('Error')
    console.log(error)
  }
}

const addRoute = async (options) => {
  try {
    const formattedOptions = {
      ...options,
      instanceCamelCase: camelCase(options.instance),
    }
    await updateRoutes(formattedOptions)
    await updateController(formattedOptions)
    await updateService(formattedOptions)
  } catch (error) {
    console.log('Error occurred:', error)
  }
}

module.exports = addRoute