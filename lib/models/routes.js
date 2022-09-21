const express = require('express')
const {
  list,
  getById,
  create,
  update,
  remove,
} = require('./controller')
const isAuthenticated = require('@/src/middlewares/isAuthenticated')
const hasAuthorization = require('@/src/middlewares/hasAuthorization')

const { validate } = require('@/src/middlewares/validators')
const schema = require('./schema')

const router = express.Router()

router
  .get('/', isAuthenticated, hasAuthorization, validate(schema.filter, 'query'), list)
  .get('/:id', isAuthenticated, hasAuthorization, getById)
  .post('/', isAuthenticated, hasAuthorization, validate(schema.create, 'body'), create)
  .put('/:id', isAuthenticated, hasAuthorization, validate(schema.update, 'body'), update)
  .delete('/:id', isAuthenticated, hasAuthorization, remove)

module.exports = router
