import {DataTypes as t} from "sequelize"

import createSlug from "core/helper/util/createSlug"

const schema = {
  id: {
    type: t.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: t.STRING,
    allowNull: false,
    unique: true,

    set(name) {
      this.setDataValue("name", name.toLowerCase())
      this.setDataValue("slug", createSlug(name))
    }
  },
  slug: {
    type: t.STRING,
    allowNull: false
  },
  prefix: {
    type: t.STRING,
    unique: true,
    comment: "Prefix that is used to match category to where a tag belongs.",

    set(prefix) {
      if (!prefix) {
        return undefined
      }

      if (!prefix.endsWith(":")) {
        prefix += ":"
      }

      this.setDataValue("prefix", prefix)
    }
  },
  order: {
    type: t.INTEGER.UNSIGNED,
    allowNull: false
  }
}

export default schema
