module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Instance', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    work_space_id: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: { tableName: 'WorkSpace' },
        key: 'id',
      },
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    deleted_at: {
      type: Sequelize.DATE,
    },
  }, {
    schema: 'moduleName',
  }),
  down: queryInterface => queryInterface.dropTable(
    {
      tableName: 'Instance',
      schema: 'moduleName',
    },
  ),
}