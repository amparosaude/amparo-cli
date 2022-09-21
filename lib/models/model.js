const {
  DATE,
  STRING,
} = require('sequelize')
const { generatePrefixedCuid } = require('../utils')

module.exports = {
  create(sequelize) {
    const Instance = sequelize.define('Instance', {
      id: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: generatePrefixedCuid('instancePrefixed'),
      },
      name: {
        type: STRING,
        allowNull: false,
      },
      createdAt: {
        type: DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DATE,
        allowNull: false,
      },
      deletedAt: {
        type: DATE,
      },
      workSpaceId: {
        type: STRING,
        allowNull: false,
        references: {
          model: 'WorkSpace',
          key: 'id',
        },
      },
    }, {
      schema: 'moduleName',
      timestamps: true,
      paranoid: true,
      getterMethods: {
        formatted() {
          return {
            id: this.get('id'),
            name: this.get('name'),
            workSpaceId: this.get('workSpaceId'),
          }
        },
      },
    })
    return Instance
  },
  associate(Instance, {
    WorkSpace,
  }) {
    Instance.belongsTo(WorkSpace, {
      foreignKey: 'workSpaceId',
      as: 'workSpace',
    })
  },
}
