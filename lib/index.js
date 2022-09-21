const { Command } = require('commander')
const comands = require('./commands')

const cli = new Command()

cli
  .command('create-migration-table')
  .description('Create a migration file.')
  .requiredOption('-i, --instanceName <instance-name>', 'Name of table (Pascal Case).')
  .requiredOption('-m, --module <module-name>', 'Name of the module. (Camel Case)')
  .action(comands.migrations.createTable)

cli
  .command('create-model')
  .description('Create a model file.')
  .requiredOption('-i, --instanceName <instance-name>', 'Name of model (Pascal Case).')
  .requiredOption('-m, --module <module-name>', 'Name of the module. (Camel Case)')
  .action(comands.create.createModel)

cli
  .command('create-route')
  .description('Create a route file.')
  .requiredOption('-i, --instanceName <instance-name>', 'Name of route (Pascal Case).')
  .requiredOption('-m, --module <module-name>', 'Name of the module. (Camel Case)')
  .action(comands.create.createRoutes)

cli
  .command('create-schema')
  .description('Create a schema file.')
  .requiredOption('-i, --instanceName <instance-name>', 'Name of schema (Pascal Case).')
  .requiredOption('-m, --module <module-name>', 'Name of the module. (Camel Case)')
  .action(comands.create.createSchema)

cli
  .command('create-controller')
  .description('Create a controller file.')
  .requiredOption('-i, --instanceName <instance-name>', 'Name of controller (Pascal Case).')
  .requiredOption('-m, --module <module-name>', 'Name of the module. (Camel Case)')
  .action(comands.create.createController)

cli
  .command('create-service')
  .description('Create a service file.')
  .requiredOption('-i, --instanceName <instance-name>', 'Name of service (Pascal Case).')
  .requiredOption('-m, --module <module-name>', 'Name of the module. (Camel Case)')
  .action(comands.create.createService)

cli
  .command('create-module')
  .description('Create module files.')
  .requiredOption('-i, --instanceName <instance-name>', 'Name of instance (Pascal Case).')
  .requiredOption('-m, --module <module-name>', 'Name of the module. (Camel Case)')
  .action(comands.create.createModule)

cli
  .command('add-route')
  .description('Update module files.')
  .requiredOption('-url, --url <route-url>', 'Url of route.')
  .requiredOption('-mn, --methodName <method-name>', 'Name of Method. e.g. listCareLine.')
  .requiredOption('-hm, --method <route-method>', 'HTTP Method of Route. (Camel Case)')
  .requiredOption('-i, --instance <instance>', 'Name of instance (Pascal Case).')
  .requiredOption('-m, --module <module-name>', 'Name of the module. (Camel Case)')
  .action(comands.update.addRoute)

module.exports = cli