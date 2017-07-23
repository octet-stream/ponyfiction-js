import {GraphQLString as TString} from "graphql"
import {GraphQLEmail as TEmail} from "graphql-custom-types"
import Input from "parasprite/Input"

import TLogin from "graphql/scalar/user/TLogin"

import TFileInput from "../file/TFileInput"
import TContactsInput from "./TContactsInput"

const TUserInput = Input("UserInput", "Basic user information.")
  .field("login", TLogin, "An unique human-readable user identifier.", true)
  .field("email", TEmail, "An email address.", true)
  .field("password", TString, "User secured (or not :D) password.", true)
  .field("avatar", TFileInput, "User profile picture.")
  .field("contacts", TContactsInput, "User contact information.")
.end()

export default TUserInput
