import convict from 'convict'

const config = convict({
  dbConnection: {
    host: {
      format: String,
      default: 'inf-dpe-metrics20230418162151580200000028.cluster-c22zygbhabxj.us-east-1.rds.amazonaws.com',
      env: 'DB_CONNECTION_HOST'
    },
    port: {
      format: Number,
      default: 5432,
      env: 'DB_CONNECTION_PORT'
    },
    user: {
      format: String,
      default: '',
      env: 'DB_CONNECTION_USER'
    },
    password: {
      format: String,
      default: '',
      env: 'DB_CONNECTION_PASSWORD'
    },
    database: {
      format: String,
      default: 'pharmville',
      env: 'DB_CONNECTION_DATABASE'
    }
  }
})

config.validate({ allowed: 'strict' })

export default config
