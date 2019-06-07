import {createHash} from "crypto"

import {createModel, Model} from "core/db"

import schema from "./schema"

@createModel(schema)
class EmailConfirmationToken extends Model {
  static findByHash(hash) {
    return this.findOne({hash})
  }

  static async createOne({email, userId}) {
    const payload = JSON.stringify({userId, email, now: Date.now()})
    const hash = createHash("sha512").update(payload).digest("hex")

    return super.createOne({userId, email, hash})
  }
}

export default EmailConfirmationToken
