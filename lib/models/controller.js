const {
  create: createInstance,
  list: listInstances,
  getById: getInstanceById,
  update: updateInstance,
  remove: removeInstance,
} = require('./service')

const list = (req, res, next) => {
  listInstances(req.user, req.query)
    .then((instanceCamelCase) => {
      res.json({
        instanceCamelCase,
      })
    })
    .catch(next)
}

const getById = (req, res, next) => {
  getInstanceById(req.user, req.params.id)
    .then((instanceCamelCase) => {
      res.json(instanceCamelCase)
    })
    .catch(next)
}

const create = (req, res, next) => {
  createInstance(req.user, req.body)
    .then((instanceCamelCase) => {
      res.json(instanceCamelCase)
    })
    .catch(next)
}

const update = (req, res, next) => {
  updateInstance(req.user, req.params.id, req.body)
    .then((instanceCamelCase) => {
      res.json(instanceCamelCase)
    })
    .catch(next)
}

const remove = (req, res, next) => {
  removeInstance(req.user, req.params.id)
    .then((instanceCamelCase) => {
      res.json(instanceCamelCase)
    })
    .catch(next)
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
}
