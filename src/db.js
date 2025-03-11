const { createPool } = require('mariadb')
require('dotenv').config()

console.log(process.env.DB_HOST)
const pool = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASENAME,
  connectionLimit: process.env.DB_CONNECTIONLIMIT,
  queueLimit: process.env.DB_QUEUELIMIT,
  multipleStatements: true,
  namedPlaceholders: true,
  bigNumberStrings: true,
  supportBigNumbers: true,
  bigIntAsNumber: true,
  decimalAsNumber: true,
  bigIntAsNumber: true
})

/**
 * execute query
 * @param {any} query_content
 * @param {any} query_params
 * @returns
 */
exports.execute = async (query_content, query_params) => {
  return await pool.query(query_content, query_params)
}

/**
 * execute single query
 * @param {*} query_content
 * @param {*} query_params
 * @returns
 */
exports.execute_single = async (query_content, query_params) => {
  let conn = await pool.getConnection()
  let query = await pool.query(query_content, query_params)

  conn.end()
  if (query.length > 0) return query[0]
  else return null
}
