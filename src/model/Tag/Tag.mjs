import {Model} from "sequelize"

import createModel from "lib/db/createModel"

import schema from "./schema"

@createModel(schema)
class Tag extends Model { }

export default Tag
