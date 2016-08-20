'use strict'

snakecase = require 'snake-case'
{database} = require '../helper/configure'
{info} = require '../logger'

Sequelize = require 'sequelize'
sequelize = new Sequelize database.name, database.user, database.pass,
  dialect: database.driver
  host: database.host
  port: database.port
  logging: info

types =
  STRING: Sequelize.STRING
  CHAR: Sequelize.CHAR
  TEXT: Sequelize.TEXT
  INTEGER: Sequelize.INTEGER
  BIGINT: Sequelize.BIGINT
  FLOAT: Sequelize.FLOAT
  REAL: Sequelize.REAL
  DOUBLE: Sequelize.DOUBLE
  DECIMAL: Sequelize.DECIMAL
  BOOLEAN: Sequelize.BOOLEAN # implemented as tinyint (mysql)? Huh? o_O
  TIME: Sequelize.TIME
  DATE: Sequelize.DATE
  DATEONLY: Sequelize.DATEONLY
  HSTORE: Sequelize.HSTORE
  JSON: Sequelize.JSON
  JSONB: Sequelize.JSONB
  NOW: Sequelize.NOW
  BLOB: Sequelize.BLOB
  RANGE: Sequelize.RANGE
  UUID: Sequelize.UUID
  UUIDV1: Sequelize.UUIDV1
  UUIDV2: Sequelize.UUIDV2
  VIRTUAL: Sequelize.VIRTUAL
  ENUM: Sequelize.ENUM
  ARRAY: Sequelize.ARRAY
  GEOMETRY: Sequelize.GEOMETRY
  GEOGRAPHY: Sequelize.GEOGRAPHY

main = (name, schema, options = {}) ->
  options.timestamps or= off
  options.underscored = yes

  return sequelize.define snakecase("#{name}"),
    schema(types),
    options

init = ->

module.exports = main
module.exports.init = init
module.exports.Model = Sequelize.Model
