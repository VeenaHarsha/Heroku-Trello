const { Pool } = require('pg')
const dotenv = require('dotenv')
dotenv.config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

// const query = async (sql, params) => {
//   try {
//     return await pool.query(sql, params)
//   } catch (err) {
//     console.log(err)
//   }
// }
module.exports = pool
