import TUser from "graphql/type/user/TUser"
import TLogin from "graphql/scalar/user/TLogin"

import findUserByLogin from "graphql/resolve/query/user/findUserByLogin"

const resolve = {
  type: TUser,
  required: true,
  handler: findUserByLogin,
}

const login = {
  type: TLogin,
  required: true
}

const args = {login}

export {resolve, args}
