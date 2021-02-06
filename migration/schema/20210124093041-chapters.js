const {DataTypes: t} = require("sequelize")

const tableName = "chapters"
const storyFkName = "chapters_story_fk"

/**
 * @typedef {import("sequelize").QueryInterface} QueryInterface
 */

module.exports = {
  /**
   * @param {QueryInterface} q
   */
  up: async q => q.sequelize.transaction(async transaction => {
    await q.createTable(
      tableName,

      {
        id: {
          type: t.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true
        },
        story_id: {
          type: t.INTEGER.UNSIGNED,
          allowNull: false,
        },
        order: {
          type: t.INTEGER.UNSIGNED,
          allowNull: false
        },
        title: {
          type: t.STRING,
          allowNull: false
        },
        description: {
          type: t.TEXT,
          allowNull: true,
          defaultValue: null
        },
        content: {
          type: t.TEXT("medium"),
          allowNull: false
        },
        is_draft: {
          type: t.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        created_at: {
          type: t.DATE,
          allowNull: false,
          defaultValue: t.NOW
        },
        updated_at: {
          type: t.DATE,
          allowNull: false,
          defaultValue: t.NOW
        },
        published_at: {
          type: t.DATE,
          allowNull: true,
          defaultValue: null
        },
        deleted_at: {
          type: t.DATE,
          allowNull: true,
          defaultValue: null
        }
      },

      {
        transaction
      }
    )

    await q.addConstraint(
      tableName,

      {
        transaction,
        name: storyFkName,
        type: "foreign key",
        fields: ["story_id"],
        onDelete: "cascade",
        references: {
          table: "stories",
          field: "id"
        }
      }
    )
  }),

  /**
   * @param {QueryInterface} q
   */
  down: q => q.sequelize.transaction(async transaction => {
    await q.removeConstraint(tableName, storyFkName, {transaction})

    await q.dropTable(tableName, {transaction})
  })
}