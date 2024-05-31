import knex from 'knex'

import config from './config.js'

const setting = {
  client: 'pg',
  connection: {
    host: config.get('dbConnection.host'),
    port: config.get('dbConnection.port'),
    user: config.get('dbConnection.user'),
    password: config.get('dbConnection.password'),
    database: config.get('dbConnection.database')
  }
}

const knexConnection = knex(setting)

export default knexConnection
