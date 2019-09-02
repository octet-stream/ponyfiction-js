import {DataTypes as t} from "sequelize"

const {values} = Object

const schema = Collaborator => ({
  userId: {
    type: t.INTEGER,
    allowNull: false,
    field: "user_id"
  },
  role: {
    type: t.ENUM(values(Collaborator.roles)),
    default: Collaborator.roles.write,
    allowNull: false
  }
})

export default schema()
