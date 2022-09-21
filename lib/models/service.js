const {} = require('ramda')
const {
  Instance,
} = require('@/src/database')
const { verifyIfExists } = require('@/src/controllers/validators/constraintValidator')
const createQueryFilter = require('@/src/utils/createQueryFilter')

const list = (user, {
  identifier,
}) => Instance
  .scope({ method: ['accessControl', user] })
  .findAll({
    attributes: [
      'id',
    ],
    where: createQueryFilter({
      identifier,
    }, [
      {
        field: 'identifier',
        operator: 'iLike',
        value: `%${identifier}%`,
      },
    ]),
    order: [['createdAt', 'DESC']],
  })

const getById = async (user, id) => {
  const instanceCamelCase = await Instance
    .scope({ method: ['accessControl', user] })
    .findOne({
      attributes: [
        'id',
      ],
      where: {
        id,
      },
    })

  await verifyIfExists(instanceCamelCase)

  return instanceCamelCase
}

const create = async (user, instanceCamelCaseAttributes) => {
  await verifyIfInstanceIsUnique(Instance, instanceCamelCaseAttributes)

  const instanceCamelCase = await Instance.create({
    ...instanceCamelCaseAttributes,
    workSpaceId: user.workSpaceId,
  })

  return instanceCamelCase.formatted
}

const update = async (user, id, instanceCamelCaseAttributes) => {
  const instanceCamelCase = await Instance
    .scope({ method: ['accessControl', user] })
    .findOne({
      where: {
        id,
      },
    })

  await verifyIfExists(instanceCamelCase)

  const updatedInstance = await instanceCamelCase.update({
    ...instanceCamelCaseAttributes,
  })

  return updatedInstance.formatted
}

const remove = async (user, id) => {
  const instanceCamelCase = await Instance
    .scope({ method: ['accessControl', user] })
    .findOne({
      where: {
        id,
      },
    })
  await verifyIfExists(instanceCamelCase)

  await instanceCamelCase.destroy()

  return {}
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
}
